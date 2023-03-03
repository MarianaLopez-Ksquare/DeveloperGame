"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Histories = void 0;
const sequelize_1 = require("sequelize");
class Histories extends sequelize_1.Model {
    static initModel(sequelize) {
        Histories.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            playerId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            questionId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            points: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
        }, {
            sequelize
        });
    }
}
exports.Histories = Histories;
