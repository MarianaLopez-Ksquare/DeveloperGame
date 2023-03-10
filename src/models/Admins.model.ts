import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";

export class Admins extends Model<InferAttributes<Admins>, InferCreationAttributes<Admins>> {
  declare id: CreationOptional<number>; //Propiedades no van a ser emitidas en el js
  declare uid: string;
  declare name: string;

  
  public static initModel(sequelize: Sequelize): void {
    Admins.init({
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
        defaultValue: "",
      },
    }, {
      sequelize
    })
  }
}

