import { GetUserService } from "../service/getUserById.service.js";


/**
 * 
 * @param {import("fastify").FastifyInstance} app 
 * @param {any} options 
 */
export default async function (app, options) {

    app.get("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" }
                }
            }
        }
    }, async (request, reply) => {
        const userService = new GetUserService(app, request, reply);
        let user = await userService.getUserById();
        if (!user) {
            return reply.notFound(`can not found user ${request.params.id}`);
        }
        return reply.status(200).send(user);
    });

}