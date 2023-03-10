"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const sequelize_1 = require("sequelize");
class Admins extends sequelize_1.Model {
    static initModel(sequelize) {
        Admins.init({
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
                defaultValue: "",
            },
        }, {
            sequelize
        });
    }
}
exports.Admins = Admins;
