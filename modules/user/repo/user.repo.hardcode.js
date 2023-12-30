import { UserRepo } from "./user.repo.js";

export class UserHardcodeRepo extends UserRepo {
    constructor() {
        super();
    }

    findOneById(id) {
        const fakeUsers = [
            {
                id: 1,
                name: "John",
                age: 20
            },
            {
                id: 2,
                name: "Jane",
                age: 18
            }
        ];

        return fakeUsers.find(user => user.id === id);
    }
}