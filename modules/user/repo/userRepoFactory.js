import { UserSqlRepo } from "./user.repo.sql.js";
import { UserMongooseRepo } from "./user.repo.mongoose.js";
import { UserHardcodeRepo } from "./user.repo.hardcode.js";
import { ServerEnv } from "../../../env-class.js";



export class UserRepoFactory {
    constructor() {}

    getRepo() {
        if (ServerEnv().dbType === "sql") {
            return new UserSqlRepo();
        } else if (ServerEnv().dbType === "mongo") {
            return new UserMongooseRepo();
        } else {
            return new UserHardcodeRepo();
        }
    }
}