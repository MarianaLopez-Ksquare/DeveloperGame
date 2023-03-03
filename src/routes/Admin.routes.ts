import axios from "axios";
import { Router, Response,  Request } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized"
import { Histories } from "../models/Histories.model";
import { fetchAdmin } from "../repository/Admin.repo";
import { createMatch, fetchMatches } from "../repository/Match.repo";
import { createQuestion, fetchQuestionById, updateQuestion, fetchQuestions, deleteQuestionById } from "../repository/Question.repo";
import { getToken, getUIDFromToken } from "../repository/utils";

const dotenv = require("dotenv");
dotenv.config();

export const AdminRouter = Router();

// Admin Endpoints

//Create an endpoint where an admin can create a new doctor account (user).  
AdminRouter.post("/question",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ) , async (req: Request, res: Response) => {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const { categoryId, levelId, description, a, b, c, d, answer } = req.body;
  
    if (!categoryId || !levelId || !a || !b || !c || !d || !answer) {
        return res.status(400).send({error: "Missing fields"});
    }
  
    try {
        // const user_uid = await createUserIfNotExist(displayName, categoryId, password, "doctor");
        // Step 2: Create and Fill our Doctor Model with the info and link to the new userId
        const question = await createQuestion(categoryId, levelId, description, a, b, c, d, answer);
        // Step 3: send the doctor info in case everything is ok
        res.status(201).send({
            question
        });
    } catch (error) {
        return res.status(500).send({error});
    }
});

AdminRouter.put("/question/:question_id",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ) , async (req: Request, res: Response) => {
    const question_id = Number(req.params['question_id']);
    const body = req.body;
    if (question_id <= 0){
        res.status(404);
        res.send({
            error:'Invalid id'
        })
    }

    const affectedRows = await updateQuestion(question_id, body);

    if (!affectedRows){
        res.status(400);
        return res.send({
            error: 'Somenthing went wrong'
        })
    }

    if (affectedRows [0] === 0){
        res.status(400);
        return res.send({
            error: 'Update failed'
        })
    }

    const foundQuestion = await fetchQuestionById(question_id)

    res.status(200);
    return res.send(foundQuestion)
});

AdminRouter.delete("/question/:question_id",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ) , async (req: Request, res: Response) => {
    const question_id = Number(req.params['question_id']);
    const body = req.body;
    try {
        if (question_id <= 0){
            res.status(404);
            res.send({
                error:'Invalid id'
            })
        }
    
        await deleteQuestionById(question_id);
    
        res.status(201);
        return res.send();       
    } catch (error) {
        res.status(500).send(error);
    }

});

AdminRouter.get("/question/:question_id",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ) , async (req: Request, res: Response) => {
    const question_id = Number(req.params['question_id']);
    const body = req.body;
    try {
        if (question_id <= 0){
            res.status(404);
            res.send({
                error:'Invalid id'
            })
        }
    
        const question = await fetchQuestionById(question_id);
    
        if (!question){
            res.status(404);
            return res.send({
                error: 'Not found'
            })
        }
    
        res.status(200);
        return res.send(question)        
    } catch (error) {
        res.status(500).send(error);
    }

});

AdminRouter.get("/question",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ), async (req:Request, res: Response) => {
    try {
        const { categoryId, levelId } = req.query;
        const questions = await fetchQuestions(Number(categoryId), Number(levelId));
        return res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({error});
    }
});


//Create an endpoint where an admin can create a new doctor account (user).  
AdminRouter.post("/signin", async (req: Request, res: Response) => {

    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send({error: "Missing fields"});
    };
    try {

        // Login with firebase api ref: https://firebase.google.com/docs/reference/rest/auth
        // Important*** pass on body request 'returnSecureToken' as true in order to generete token that can access the project and avoid "issues". Ref: https://stackoverflow.com/questions/47817069/firebase-verify-id-token-gives-firebase-id-token-has-incorrect-iss
        const user = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY-veu5OPCdhvlgRVvC0bsfNbTNmzsW6w", {email, password, returnSecureToken: true } ,{
            headers: {
                'Content-Type': 'application/json'  
            }
        }, );
        const uid = await getUIDFromToken(user?.data?.idToken);
        const admin =  await fetchAdmin(uid);
        if (!admin) {
            return res.status(401).send({
                code: "UnAuthorized",
                message: "You are not an admin, try with an admin account!"
            })
        }
        res.status(200).send(user.data);
    } catch (error) {
        res.status(500).send({error});
    }
});

// Llamado por admin y dueñño
AdminRouter.get("/session", isAuthenticated, isAuthorized({roles: ["admin"], allowSamerUser: false}), async (req:Request, res: Response) => {
    try {
        const token = getToken(req);
        
        const  uid  = await getUIDFromToken(token);
        if (!uid) {
            return res.status(500).send({error: "UID was not found"});
        }
        const user = await fetchAdmin(uid);
        return res.status(200).send(user);
    } catch (error) {
        res.status(500).send({error});
    }
});

AdminRouter.get("/match",isAuthenticated, isAuthorized( {roles: ["admin"], allowSamerUser: false} ), async (req:Request, res: Response) => {
    try {
        const {playerId, categoryId, levelId } = req.query;
        console.log('====================================');
        console.log("controllerllego");
        console.log('====================================');
        const questions = await fetchMatches(Number(playerId), Number(categoryId), Number(levelId));
        return res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({error});
    }
});

AdminRouter.post("/match",  isAuthenticated, isAuthorized({roles: ["admin", "player"], allowSamerUser: false}), async (req: Request, res: Response) => {

    const {playerId, questionId , answer} = req.body;
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    if (!playerId || !questionId || !answer) {
        return res.status(400).send({error: "Missing fields"});
    };
    try {
        const history = await createMatch(Number(playerId), Number(questionId), answer);
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send({error});
    }
});


AdminRouter.get("/match:match_id",  isAuthenticated, isAuthorized({roles: ["admin"], allowSamerUser: false}), async (req: Request, res: Response) => {

    const { match_id } = req.params;

    if (!match_id) {
        return res.status(400).send({error: "Missing fields"});
    };
    try {
        const history = await Histories.findOne({
            where: {
                id: match_id,
            }
        })
        res.status(200).send(history);
    } catch (error) {
        res.status(500).send({error});
    }
});

