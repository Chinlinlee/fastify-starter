import { Model, DataTypes } from "sequelize";

class UserModel extends Model { 
    static async initForFastify(app) {
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
            sequelize: app.sequelize,
            modelName: "user",
            tableName: "user",
            freezeTableName: true
        });
    }
}

export { UserModel };