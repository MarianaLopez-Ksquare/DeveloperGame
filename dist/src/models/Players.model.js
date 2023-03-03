"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Players = void 0;
const sequelize_1 = require("sequelize");
class Players extends sequelize_1.Model {
    static initModel(sequelize) {
        Players.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uid: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
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
exports.Players = Players;
