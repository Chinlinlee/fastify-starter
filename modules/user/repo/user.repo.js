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