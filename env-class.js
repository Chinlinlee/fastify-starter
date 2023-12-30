// 抓取 env 的設定
// 使用 env-var 來驗證以及針對數值轉換 env 的設定

import envVar from "env-var";
import dotenv from "dotenv";

dotenv.config();

export const ServerEnv = function () {
    return {
        host: envVar.get("SERVER_HOST").required().default("0.0.0.0").asString(),
        port: envVar.get("SERVER_PORT").required().default(3000).asPortNumber(),
        dbType: envVar.get("SERVER_DB_TYPE").default("mongo").asString()
    };
};


export const MongoDbEnv = function () {
    return {
        dbName: envVar.get("MONGODB_NAME").required().asString(),
        hosts: envVar.get("MONGODB_HOSTS").required().asJsonArray(),
        ports: envVar.get("MONGODB_PORTS").required().asJsonArray(),
        user: envVar.get("MONGODB_USER").asString(),
        password: envVar.get("MONGODB_PASSWORD").asString(),
        authSource: envVar.get("MONGODB_AUTH_SOURCE").asString()
    };
};

export const SqlEnv = function () {
    return {
        dbName: envVar.get("SQL_DB").required().asString(),
        host: envVar.get("SQL_HOST").required().asString(),
        port: envVar.get("SQL_PORT").required().asPortNumber(),
        user: envVar.get("SQL_USERNAME").asString(),
        password: envVar.get("SQL_PASSWORD").asString(),
        dialect: envVar.get("SQL_TYPE").default("postgres").asString(),
        logging : envVar.get("SQL_LOGGING").default("false").asBool(),
        forceSync : envVar.get("SQL_FORCE_SYNC").default("false").asBool()
    };
};