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
exports.fetchMatches = exports.createMatch = void 0;
const Categories_model_1 = require("../models/Categories.model");
const Histories_model_1 = require("../models/Histories.model");
const Levels_model_1 = require("../models/Levels.model");
const Players_model_1 = require("../models/Players.model");
const Questions_model_1 = require("../models/Questions.model");
const createMatch = (playerId, questionId, answer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let points = 0;
        const out = yield Questions_model_1.Questions.findOne({
            where: {
                id: questionId,
            },
            attributes: ["levelId", "answer"],
            include: [
                {
                    model: Levels_model_1.Levels,
                    as: "level"
                }
            ]
        }).then((model) => {
            var _a;
            console.log('====================================');
            console.log(model);
            console.log('====================================');
            console.log('====================================');
            console.log("model.answer: ", model.answer);
            console.log('====================================');
            return {
                level: (_a = model === null || model === void 0 ? void 0 : model.level) === null || _a === void 0 ? void 0 : _a.name,
                isCorrect: model.answer == answer
            };
        });
        console.log('====================================');
        console.log(out);
        console.log('====================================');
        if (out.level === "Easy")
            points = 10 * out.isCorrect;
        if (out.level === "Intermidiate")
            points = 20 * out.isCorrect;
        if (out.level === "Hard")
            points = 30 * out.isCorrect;
        const newMatch = yield Histories_model_1.Histories.create({ playerId, questionId, points });
        const matchInclude = yield Histories_model_1.Histories.findByPk(newMatch.id, {
            include: [
                {
                    model: Questions_model_1.Questions,
                    as: "question",
                    include: [
                        {
                            model: Levels_model_1.Levels,
                            as: "level"
                        },
                        {
                            model: Categories_model_1.Categories,
                            as: "category"
                        }
                    ]
                },
                {
                    model: Players_model_1.Players,
                    as: "player"
                }
            ]
        });
        return {
            id: newMatch.id,
            player: matchInclude.player.name,
            question: matchInclude.question.description,
            category: matchInclude.question.category.name,
            level: matchInclude.question.level.name,
            isCorrect: matchInclude.points > 0,
            createdAt: matchInclude.createdAt,
        };
    }
    catch (error) {
        console.error(error);
        return error;
    }
});
exports.createMatch = createMatch;
const fetchMatches = (playerId, categoryId, levelId) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    const where2 = {};
    if (playerId > 0) {
        where["playerId"] = playerId;
    }
    ;
    if (categoryId > 0) {
        where2["categoryId"] = categoryId;
    }
    ;
    if (levelId > 0) {
        where2["levelId"] = levelId;
    }
    ;
    try {
        const matches = [];
        console.log('====================================');
        console.log("sddsfsdf");
        console.log('====================================');
        const foundMatches = yield Histories_model_1.Histories.findAll({
            where,
            include: [
                {
                    model: Questions_model_1.Questions,
                    as: "question",
                    where: Object.assign({}, where2),
                    include: [
                        {
                            model: Levels_model_1.Levels,
                            as: "level",
                        },
                        {
                            model: Categories_model_1.Categories,
                            as: "category",
                        }
                    ]
                },
                {
                    model: Players_model_1.Players,
                    as: "player"
                }
            ]
        });
        for (let match of foundMatches) {
            const outputQuestion = {
                id: match.id,
                player: match.player.name,
                question: match.question.description,
                category: match.question.category.name,
                level: match.question.level.name,
                isCorrect: match.points > 0,
                createdAt: match.createdAt,
            };
            matches.push(outputQuestion);
        }
        return matches;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchMatches = fetchMatches;
