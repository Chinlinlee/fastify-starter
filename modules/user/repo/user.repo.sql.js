import { UserModel } from "../../../database/sql/models/user.js";
import { UserRepo } from "./user.repo.js";

export class UserSqlRepo extends UserRepo {
    constructor() {
        super();
    }

    async findOneById(id) {
        let foundUser = await UserModel.findOne({
            where: {
                id
            }
        });
        if (foundUser) {
            return await this.adjustUser(foundUser);
        }
        return undefined;
    }

    /**
     * 
     * @param {UserModel} user 
     * @returns 
     */
    async adjustUser(user) {
        return user.toJSON();
    }
}