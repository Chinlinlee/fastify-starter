import mongoose from "mongoose";
import { MongoDbEnv, ServerEnv } from "../env-class.js";
import fp from "fastify-plugin";


/**
 * 
 * @param {import("fastify").FastifyInstance} app 
 * @param {*} opts 
 */
async function createMongoDBInstance(app, opts) {
    let connectionUrl = "";
    
    MongoDbEnv().hosts.forEach((host, index) => {
        if (index == 0) {
            connectionUrl += `mongodb://${host}:${MongoDbEnv().ports[0]}`;
        } else {
            connectionUrl += `,${host}:${MongoDbEnv().ports[index]}`;
        }
    });

    connectionUrl += `/${MongoDbEnv().dbName}`;

    /** @type { import("mongoose").ConnectOptions } */
    let connectOptions = {};
    if (MongoDbEnv().user && MongoDbEnv().password) {
        connectOptions.user = MongoDbEnv().user;
        connectOptions.pass = MongoDbEnv().password;
        connectOptions.authSource = MongoDbEnv().authSource;
    }

    mongoose.connection.on("open", () => {
        app.log.info("Connected to MongoDB!!");
    });
    await mongoose.connect(connectionUrl, connectOptions);

    app.decorate("mongoose", mongoose);
}

let exportFn = async (app, opts) => {};

if (ServerEnv().dbType === "mongo") {
    exportFn = createMongoDBInstance;
}

export default fp(exportFn, {
    name: "mongoose"
});