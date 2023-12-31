import { Model, DataTypes } from "sequelize";
import sequelizeInstance from "../index.js";

class UserModel extends Model { }


UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "user",
    tableName: "user",
    freezeTableName: true
});

export { UserModel };