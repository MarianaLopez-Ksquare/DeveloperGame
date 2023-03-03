"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questions = void 0;
const sequelize_1 = require("sequelize");
class Questions extends sequelize_1.Model {
    static initModel(sequelize) {
        Questions.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            categoryId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            levelId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            a: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            b: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            c: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            d: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            answer: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            }
        }, {
            sequelize
        });
    }
}
exports.Questions = Questions;
