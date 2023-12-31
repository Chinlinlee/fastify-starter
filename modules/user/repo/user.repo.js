
/**
 * 最基礎的 User Repository class
 * 你必須在這裡定義所有你需要(資料庫的互操作)的方法
 * 定義後，你就可以繼承這個 class 來實作自己的 Repository
 * 以保障你之後不管使用哪種資料庫，都可以繼承這個 class 進行實作
 * 而使用方法則會是 new UserRepo(new yourRepoImpl());
 * 今天使用 sql 你則需要實作 UserSqlRepo，並變成 new UserRepo(new UserSqlRepo());
 * 使用 mongo 你則需要實作 UserMongooseRepo，並變成 new UserRepo(new UserMongooseRepo());
 * 變更的只會是使用到 UserRepo 最外圍的實例
 */
export class UserRepo {
    #repoImpl;
    constructor(repoImpl) {
        this.#repoImpl = repoImpl;
    }

    async findOne(options) {
        return await this.#repoImpl.findOne(options);
    }

    async findOneById(id) {
        return await this.#repoImpl.findOneById(id);
    }
}