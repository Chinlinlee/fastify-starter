import { UserSqlRepo } from "./user.repo.sql.js";
import { UserMongooseRepo } from "./user.repo.mongoose.js";
import { UserHardcodeRepo } from "./user.repo.hardcode.js";
import { ServerEnv } from "../../../env-class.js";


/**
 * 這是 User Repository Factory (User 資料庫物件工廠)
 * 主要透過 ServerEnv().dbType 來決定要使用哪種 Repository 的 Class
 * 現在實作的功能並不多，但你可以想像，若是有非常多的地方需要獲取當下的 User Repository，你就必須複製貼上 if/else 的程式碼
 * 到時候，相同功能的程式碼將會遍佈滿地，難以修改
 */
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