"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const Histories_model_1 = require("../models/Histories.model");
const Admin_repo_1 = require("../repository/Admin.repo");
const Match_repo_1 = require("../repository/Match.repo");
const Question_repo_1 = require("../repository/Question.repo");
const utils_1 = require("../repository/utils");
const dotenv = require("dotenv");
dotenv.config();
exports.AdminRouter = (0, express_1.Router)();
// Admin Endpoints
//Create an endpoint where an admin can create a new doctor account (user).  
exports.AdminRouter.post("/question", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
    const { categoryId, levelId, description, a, b, c, d, answer } = req.body;
    if (!categoryId || !levelId || !a || !b || !c || !d || !answer) {
        return res.status(400).send({ error: "Missing fields" });
    }
    try {
        // const user_uid = await createUserIfNotExist(displayName, categoryId, password, "doctor");
        // Step 2: Create and Fill our Doctor Model with the info and link to the new userId
        const question = yield (0, Question_repo_1.createQuestion)(categoryId, levelId, description, a, b, c, d, answer);
        // Step 3: send the doctor info in case everything is ok
        res.status(201).send({
            question
        });
    }
    catch (error) {
        return res.status(500).send({ error });
    }
}));
exports.AdminRouter.put("/question/:question_id", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question_id = Number(req.params['question_id']);
    const body = req.body;
    if (question_id <= 0) {
        res.status(404);
        res.send({
            error: 'Invalid id'
        });
    }
    const affectedRows = yield (0, Question_repo_1.updateQuestion)(question_id, body);
    if (!affectedRows) {
        res.status(400);
        return res.send({
            error: 'Somenthing went wrong'
        });
    }
    if (affectedRows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed'
        });
    }
    const foundQuestion = yield (0, Question_repo_1.fetchQuestionById)(question_id);
    res.status(200);
    return res.send(foundQuestion);
}));
exports.AdminRouter.delete("/question/:question_id", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question_id = Number(req.params['question_id']);
    const body = req.body;
    try {
        if (question_id <= 0) {
            res.status(404);
            res.send({
                error: 'Invalid id'
            });
        }
        yield (0, Question_repo_1.deleteQuestionById)(question_id);
        res.status(201);
        return res.send();
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.AdminRouter.get("/question/:question_id", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question_id = Number(req.params['question_id']);
    const body = req.body;
    try {
        if (question_id <= 0) {
            res.status(404);
            res.send({
                error: 'Invalid id'
            });
        }
        const question = yield (0, Question_repo_1.fetchQuestionById)(question_id);
        if (!question) {
            res.status(404);
            return res.send({
                error: 'Not found'
            });
        }
        res.status(200);
        return res.send(question);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.AdminRouter.get("/question", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, levelId } = req.query;
        const questions = yield (0, Question_repo_1.fetchQuestions)(Number(categoryId), Number(levelId));
        return res.status(200).send(questions);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
//Create an endpoint where an admin can create a new doctor account (user).  
exports.AdminRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Missing fields" });
    }
    ;
    try {
        // Login with firebase api ref: https://firebase.google.com/docs/reference/rest/auth
        // Important*** pass on body request 'returnSecureToken' as true in order to generete token that can access the project and avoid "issues". Ref: https://stackoverflow.com/questions/47817069/firebase-verify-id-token-gives-firebase-id-token-has-incorrect-iss
        const user = yield axios_1.default.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCY-veu5OPCdhvlgRVvC0bsfNbTNmzsW6w", { email, password, returnSecureToken: true }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const uid = yield (0, utils_1.getUIDFromToken)((_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.idToken);
        const admin = yield (0, Admin_repo_1.fetchAdmin)(uid);
        if (!admin) {
            return res.status(401).send({
                code: "UnAuthorized",
                message: "You are not an admin, try with an admin account!"
            });
        }
        res.status(200).send(user.data);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
// Llamado por admin y dueñño
exports.AdminRouter.get("/session", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, utils_1.getToken)(req);
        const uid = yield (0, utils_1.getUIDFromToken)(token);
        if (!uid) {
            return res.status(500).send({ error: "UID was not found" });
        }
        const user = yield (0, Admin_repo_1.fetchAdmin)(uid);
        return res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.AdminRouter.get("/match", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { playerId, categoryId, levelId } = req.query;
        console.log('====================================');
        console.log("controllerllego");
        console.log('====================================');
        const questions = yield (0, Match_repo_1.fetchMatches)(Number(playerId), Number(categoryId), Number(levelId));
        return res.status(200).send(questions);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.AdminRouter.post("/match", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId, questionId, answer } = req.body;
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    if (!playerId || !questionId || !answer) {
        return res.status(400).send({ error: "Missing fields" });
    }
    ;
    try {
        const history = yield (0, Match_repo_1.createMatch)(Number(playerId), Number(questionId), answer);
        res.status(200).send(history);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
exports.AdminRouter.get("/match:match_id", isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ["admin"], allowSamerUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { match_id } = req.params;
    if (!match_id) {
        return res.status(400).send({ error: "Missing fields" });
    }
    ;
    try {
        const history = yield Histories_model_1.Histories.findOne({
            where: {
                id: match_id,
            }
        });
        res.status(200).send(history);
    }
    catch (error) {
        res.status(500).send({ error });
    }
}));
