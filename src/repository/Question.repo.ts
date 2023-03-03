import { InferAttributes, where } from "sequelize";
import { Categories } from "../models/Categories.model";
import { Levels } from "../models/Levels.model";
import { Questions } from "../models/Questions.model";

export const createQuestion = async (categoryId: number, levelId: number, description: string, a: string, b: string, c: string, d: string, answer: string) => {
    try {
        const newQuestion = await Questions.create({categoryId, levelId, description, a, b, c, d, answer});
        return newQuestion;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const updateQuestion = async (id: number, questionModel: InferAttributes<Questions>) => {
    try {
        const question = await Questions.update(questionModel, {
            where:{ 
                id: id
            }
        })
        return question;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchQuestionById = async(idGivenByUser:number) =>{

    try {
       const foundQuestion = await Questions.findOne({  //SELECT * FROM "Doctor" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
        })

        return foundQuestion;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

export const fetchQuestions = async(categoryId: number, levelId: number) =>{
    const where: any = {}
    if (categoryId > 0) {
        where["categoryId"] = categoryId;
    };

    if (levelId > 0) {
        where["levelId"] = levelId;
    };

    try {
        const questions = [];
       const foundQuestions: any[] = await Questions.findAll({
        where,
        attributes: {
            exclude: ["updatedAt", "createdAt"]
        },
        include: [
            {
                model: Categories,
                as: "category",
                // where: {
                //     id: categoryId,
                // },
                attributes: ["name", "id", "description"]
            },
            {
                model: Levels,
                as: "level",
                // where: {
                //     id: levelId
                // },
                attributes: [ "name", "id"]
            }
        ]
       });
       for(let question of foundQuestions) {
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
            }
            questions.push(outputQuestion);
       }
        return questions;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteQuestionById = async(idGivenByUser:number) =>{

    try {
       const numberOfDestoyedRows = await Questions.destroy({  //SELECT * FROM "Appointment" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
    
        })

        return numberOfDestoyedRows;
    } catch (error) {
        console.error(error);
        return null;
    }
}