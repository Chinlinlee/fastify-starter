import fp from "fastify-plugin";
import { ServerEnv, SqlEnv } from "../env-class.js";
import { UserModel } from "../database/sql/models/user.js";
import sequelizeInstance from "../database/sql/index.js";

/**
 * 
 * @param {import("fastify").FastifyInstance} app 
 * @param {*} opts 
 */
async function createSequelizeInstance(app, opts) {

    try {
        await sequelizeInstance.authenticate();

        app.decorate("sequelize", sequelizeInstance);
    } catch(e) {
        console.error('Unable to connect to the SQL database:', e);
        process.exit(1);
    }

    await app.sequelize.sync({
        force: SqlEnv().forceSync
    });
    
    app.log.info("SQL Database connected");
}

let exportFn = async (app, opts) => {};

if (ServerEnv().dbType === "sql") {
    exportFn = createSequelizeInstance;
}

export default fp(exportFn, {
    name: "sql"
});
