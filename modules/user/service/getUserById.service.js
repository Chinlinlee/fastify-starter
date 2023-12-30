export class GetUserService { 
    constructor(app, request, reply) {
        /** @type { import("fastify").FastifyInstance } */
        this.app = app;
        /** @type { import("fastify").FastifyRequest } */
        this.request = request;
        /** @type { import("fastify").FastifyReply } */
        this.reply = reply;
    }

    async getUserById() {
        let { id } = this.request.params;
        return await this.app.userModel.findOneById(id);
    }
}