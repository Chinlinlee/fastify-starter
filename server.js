// 這是讓你啟動 server 的入口檔案
import { buildApp } from "./app.js";
import { ServerEnv } from "./env-class.js";
import closeWithGrace from "close-with-grace";

/** @type {import("fastify").FastifyServerOptions} */
const appOptions = {
    logger: {
        level: "info"
    }
};


// 我們希望只有在有人監看(開發)時才使用 pino-pretty
// 否則我們將以換行分隔的 JSON 形式進行記錄，以便輸入至 log 專用的 tool
if (process.stdout.isTTY) {
    appOptions.logger.transport = {
        target: "pino-pretty"
    };
}

const app = await buildApp(appOptions);
console.log(app.printRoutes());

await app.listen({
    host: ServerEnv().host,
    port: ServerEnv().port
});

closeWithGrace(async ({ err }) => {
    if (err) {
        app.log.error({ err }, "server close due to error");
    }
    app.log.info("shutting down server gracefully");
    await app.close();
});