import autoLoad from "@fastify/autoload";
import { join } from "desm";
import { UserRepo } from "./repo/user.repo.js";
import { UserRepoFactory } from "./repo/userRepoFactory.js";


/**
 * 
 * @param {import("fastify").FastifyInstance} app 
 * @param {any} options 
 */
export default async function user (app, options) {
    app.decorate("userModel", new UserRepo(new UserRepoFactory().getRepo()));

    app.register(autoLoad, {
        dir: join(import.meta.url, "routes"),
        options: {
            prefix: options.prefix
        }
    });
}