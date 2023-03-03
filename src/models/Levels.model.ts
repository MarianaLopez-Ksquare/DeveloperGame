import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";
import { Questions } from "./Questions.model";

export class Levels extends Model<InferAttributes<Levels>, InferCreationAttributes<Levels>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare name: string;

  
  public static initModel(sequelize: Sequelize): void {
    Levels.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize
    });
  }
}