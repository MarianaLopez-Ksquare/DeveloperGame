import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";


export class Players extends Model<InferAttributes<Players>, InferCreationAttributes<Players>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare uid: string;
  declare name: string;
  
  public static initModel(sequelize: Sequelize): void {
    Players.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize
    })
  }
}