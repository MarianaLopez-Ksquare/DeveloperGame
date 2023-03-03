import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional  } from "sequelize";
import { Questions } from "./Questions.model";


export class Categories extends Model<InferAttributes<Categories>, InferCreationAttributes<Categories>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare isHiden: CreationOptional<boolean>;
  
  public static initModel(sequelize: Sequelize): void {
    Categories.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isHiden: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    }, {
      sequelize
    })
  }
}