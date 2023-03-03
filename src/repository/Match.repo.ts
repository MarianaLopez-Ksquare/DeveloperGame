import { InferAttributes, where } from "sequelize";
import { Categories } from "../models/Categories.model";
import { Histories } from "../models/Histories.model";
import { Levels } from "../models/Levels.model";
import { Players } from "../models/Players.model";
import { Questions } from "../models/Questions.model";

export const createMatch = async (playerId: number, questionId: number, answer: string) => {
    try {

        let points = 0;
        const out: any = await Questions.findOne({
            where: {
                id: questionId,
            },
            attributes: ["levelId", "answer"],
            include: [
                {
                    model: Levels,
                    as: "level"
                }
            ]
        }).then( (model: any) => {
            console.log('====================================');
            console.log(model);
            console.log('====================================');
            console.log('====================================');
            console.log("model.answer: ", model.answer);
            console.log('====================================');
            return {
                level: model?.level?.name,
                isCorrect: model.answer == answer
            }
        });
        console.log('====================================');
        console.log(out);
        console.log('====================================');
        if (out.level === "Easy") points = 10 * out.isCorrect;
        if (out.level === "Intermidiate") points = 20 * out.isCorrect;
        if (out.level === "Hard") points = 30 * out.isCorrect;

        const newMatch = await Histories.create({ playerId, questionId, points });
        const matchInclude: any = await Histories.findByPk(newMatch.id, {
            include: [
                    {
                    model: Questions,
                    as: "question",
                    include: [
                        {
                            model: Levels,
                            as: "level"
                        },
                        {
                            model: Categories,
                            as: "category"
                        }
                    ]
                },
                {
                    model: Players,
                    as: "player"
                }
            ]
        })
        return {
            id: newMatch.id,
            player: matchInclude.player.name,
            question: matchInclude.question.description,
            category: matchInclude.question.category.name,
            level: matchInclude.question.level.name,
            isCorrect: matchInclude.points > 0,
            createdAt: matchInclude.createdAt,
        };
    } catch (error) {
        console.error(error);
        return error;
    }
};


export const fetchMatches = async(playerId: number, categoryId: number, levelId: number) =>{
    const where: any = {}
    const where2: any = {}
    if (playerId > 0) {
        where["playerId"] = playerId;
    };
    if (categoryId > 0) {
        where2["categoryId"] = categoryId;
    };
    if (levelId > 0) {
        where2["levelId"] = levelId;
    };


    try {
        const matches = [];
        console.log('====================================');
        console.log("sddsfsdf");
        console.log('====================================');
        const foundMatches: any[] = await Histories.findAll({
            where,
            include: [
                {
                    model: Questions,
                    as: "question",
                    where: {...where2},
                    include: [
                        {
                            model: Levels,
                            as: "level",
                        },
                        {
                            
                            model: Categories,
                            as: "category",
                        }
                    ]
                },
                {
                    model: Players,
                    as: "player"
                }
            ]
        })
        for(let match of foundMatches) {
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
    } catch (error) {
        console.error(error);
        return null;
    }
}