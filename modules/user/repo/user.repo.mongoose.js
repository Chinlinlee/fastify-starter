import { UserModel } from "../../../database/mongoDB/models/user.js";
import { UserRepo } from "./user.repo.js";

export class UserMongooseRepo extends UserRepo {
    constructor() {
        super();
    }

    async findOneById(id) {
        let foundUser = await UserModel.findOne({id}).exec();
        if (foundUser) {
            return await this.adjustUser(foundUser);
        }
        return undefined;
    }

    async adjustUser(user) {
        return user.toObject();
    }
}