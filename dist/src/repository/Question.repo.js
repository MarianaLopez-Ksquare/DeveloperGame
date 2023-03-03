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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionById = exports.fetchQuestions = exports.fetchQuestionById = exports.updateQuestion = exports.createQuestion = void 0;
const Categories_model_1 = require("../models/Categories.model");
const Levels_model_1 = require("../models/Levels.model");
const Questions_model_1 = require("../models/Questions.model");
const createQuestion = (categoryId, levelId, description, a, b, c, d, answer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = yield Questions_model_1.Questions.create({ categoryId, levelId, description, a, b, c, d, answer });
        return newQuestion;
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createQuestion = createQuestion;
const updateQuestion = (id, questionModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Questions_model_1.Questions.update(questionModel, {
            where: {
                id: id
            }
        });
        return question;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateQuestion = updateQuestion;
const fetchQuestionById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundQuestion = yield Questions_model_1.Questions.findOne({
            where: {
                id: idGivenByUser
            }
        });
        return foundQuestion;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchQuestionById = fetchQuestionById;
const fetchQuestions = (categoryId, levelId) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (categoryId > 0) {
        where["categoryId"] = categoryId;
    }
    ;
    if (levelId > 0) {
        where["levelId"] = levelId;
    }
    ;
    try {
        const questions = [];
        const foundQuestions = yield Questions_model_1.Questions.findAll({
            where,
            attributes: {
                exclude: ["updatedAt", "createdAt"]
            },
            include: [
                {
                    model: Categories_model_1.Categories,
                    as: "category",
                    // where: {
                    //     id: categoryId,
                    // },
                    attributes: ["name", "id", "description"]
                },
                {
                    model: Levels_model_1.Levels,
                    as: "level",
                    // where: {
                    //     id: levelId
                    // },
                    attributes: ["name", "id"]
                }
            ]
        });
        for (let question of foundQuestions) {
            const outputQuestion = {
                id: question.id,
                title: question.description,
                category: question.category.name,
                categoryId: question.category.id,
                categoryDescription: question.category.description,
                level: question.level.name,
                levelId: question.level.id,
                options: [
                    question.a,
                    question.b,
                    question.c,
                    question.d,
                ],
                answer: question.answer,
            };
            questions.push(outputQuestion);
        }
        return questions;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchQuestions = fetchQuestions;
const deleteQuestionById = (idGivenByUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numberOfDestoyedRows = yield Questions_model_1.Questions.destroy({
            where: {
                id: idGivenByUser
            }
        });
        return numberOfDestoyedRows;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteQuestionById = deleteQuestionById;
