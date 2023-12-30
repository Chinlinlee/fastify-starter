import fasitfy from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "desm";

export async function buildApp(options = {}) {
    const app = fasitfy(options);

    app.register(autoLoad, {
        dir: join(import.meta.url, "plugins")
    });

    app.register(autoLoad, {
        dir: join(import.meta.url, "modules"),
        encapsulate: false,
        maxDepth: 1
    });

    return app;
}