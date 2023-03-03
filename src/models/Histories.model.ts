import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";


export class Histories extends Model<InferAttributes<Histories>, InferCreationAttributes<Histories>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare playerId: number;
  declare questionId: number;
  declare points: number;
  
  public static initModel(sequelize: Sequelize): void {
    Histories.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      points: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    }, {
      sequelize
    })
  }
}