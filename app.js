import fasitfy from "fastify";
import autoLoad from "@fastify/autoload";
import sensible from "@fastify/sensible";
import { join } from "desm";

export async function buildApp(options = {}) {
    const app = fasitfy(options);

    await app.register(autoLoad, {
        dir: join(import.meta.url, "plugins")
    });

    await app.register(autoLoad, {
        dir: join(import.meta.url, "modules"),
        encapsulate: false,
        maxDepth: 1
    });

    await app.register(sensible);

    return app;
}