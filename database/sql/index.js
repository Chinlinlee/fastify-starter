import { SqlEnv } from "../../env-class.js";
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

if (SqlEnv().dialect === "postgres") {
    await initPostgres();
}

export default new Sequelize({
    dialect: SqlEnv().dialect,
    host: SqlEnv().host,
    port: SqlEnv().port,
    username: SqlEnv().user,
    password: SqlEnv().password,
    database: SqlEnv().dbName,
    logging: SqlEnv().logging
});