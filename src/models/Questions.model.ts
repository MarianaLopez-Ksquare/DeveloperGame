import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";
import { Categories } from "./Categories.model";
import { Levels } from "./Levels.model";


export class Questions extends Model<InferAttributes<Questions>, InferCreationAttributes<Questions>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare categoryId: number;
  declare levelId: number;
  declare description: string;
  declare a: string;
  declare b: string;
  declare c: string;
  declare d: string;
  declare answer: string; 
  
  public static initModel(sequelize: Sequelize): void {
    Questions.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      levelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      a: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      b: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      c: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      d: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      answer:  {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize
    });
  }
}