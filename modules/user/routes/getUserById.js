// 此為使用 id 獲取 user 資訊的 route
// 記住！ route (controller) 主要做的事情
// 1. 定義 route
// 2. 接取 request
// 3. 將需要處理的事情交給 service 處理，例如：此為 getUserById 的 route，則會有 getUserByIdService 或 GetUserService
// 4. 回應對應的 response

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