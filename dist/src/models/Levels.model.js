"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Levels = void 0;
const sequelize_1 = require("sequelize");
class Levels extends sequelize_1.Model {
    static initModel(sequelize) {
        Levels.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        });
    }
}
exports.Levels = Levels;
