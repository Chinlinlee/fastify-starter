import fp from "fastify-plugin";
import { ServerEnv, SqlEnv } from "../env-class.js";
import { UserModel } from "../database/sql/models/user.js";
import { Sequelize } from "sequelize";

async function initPostgres() {
    
    const pg = (await import("pg")).default;
    
    const client = new pg.Client({
        user: SqlEnv().user,
        password: SqlEnv().password,
        host: SqlEnv().host,
        port: SqlEnv().port,
        database: "postgres"
    });

    await client.connect();

    try {
        let result = await client.query(`SELECT 'CREATE DATABASE ${SqlEnv().dbName}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${SqlEnv().dbName}')`);
        if (result.rowCount > 0) {
            await client.query(`CREATE DATABASE ${SqlEnv().dbName}`);
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await client.end();
    }
}

/**
 * 
 * @param {import("fastify").FastifyInstance} app 
 * @param {*} opts 
 */
async function createSequelizeInstance(app, opts) {

    if (SqlEnv().dialect === "postgres") {
        await initPostgres();
    }

    try {
        const sequelizeInstance = new Sequelize({
            dialect: SqlEnv().dialect,
            host: SqlEnv().host,
            port: SqlEnv().port,
            username: SqlEnv().user,
            password: SqlEnv().password,
            database: SqlEnv().dbName,
            logging: SqlEnv().logging
        });

        await sequelizeInstance.authenticate();

        app.decorate("sequelize", sequelizeInstance);
    } catch(e) {
        console.error('Unable to connect to the SQL database:', e);
        process.exit(1);
    }

    await UserModel.initForFastify(app);

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
