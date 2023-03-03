import axios from "axios";
import { Router, Response,  Request } from "express";
import { createUser, disableUser, getAllUser, readUser, updateUser, Role, createUserIfNotExist } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized"
import { createPlayer, fetchPlayer } from "../repository/User.repo";
import { getToken, getUIDFromToken } from "../repository/utils";
const dotenv = require("dotenv");
dotenv.config();

export const UserRouter = Router();


UserRouter.post("/signup", async (req: Request, res: Response) => {
  // Info desde el body
  // Checar si falta info
  // Checar que el rol sea adecuado
  const {email, password, name} = req.body;
    console.log(req.body)
  if (!email || !name || !password) {
    return res.status(400).send({error: "Missing fields"});
  }

  try {
    //Step 1: Create a User in FireBase in order to refers uid with our Player model
    const userId = await createUser(name, email, password, "player");
    //Step 2: Create a our model player linked to uid firebase
    const player = await createPlayer(userId, name);

    res.status(201).send({
        player
    });
  } catch (error) {
    res.status(500).send({error});
  }

});

UserRouter.post("/signin",async (req: Request, res: Response) => {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
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
        
        res.status(200).send(user.data);
    } catch (error) {
        res.status(500).send({error});
    }
})

UserRouter.get("/session", isAuthenticated, isAuthorized({roles: ["player"], allowSamerUser: true}), async (req:Request, res: Response) => {
    try {
        const token = getToken(req);
        
        const  uid  = await getUIDFromToken(token);
        if (!uid) {
            return res.status(500).send({error: "UID was not found"});
        }
        const user = await fetchPlayer(uid);
        return res.status(200).send(user);
    } catch (error) {
        res.status(500).send({error});
    }
})