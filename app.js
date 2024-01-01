import fasitfy from "fastify";
import autoLoad from "@fastify/autoload";
import sensible from "@fastify/sensible";
import { join } from "desm";
import underPressure from "@fastify/under-pressure";
import cors from "@fastify/cors";

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

    /**
     * 這個 plugin 會在你的應用程序處於高負載時特別有用
     * 你如果有使用 express 或其餘的 web framework，你會發現 1 秒一起發送上萬個 request 可能會造成 timeout 的問題
     * 此 plugin 會根據 nodejs event loop, heap memory, rss memory (Resident set size, 作業系統分配到application的記憶體)的狀況(過度壓力無法處裡)來響應 503 (Server Unavailable) 狀態
     */
    await app.register(underPressure, {
        maxEventLoopDelay: 1e3,
        maxHeapUsedBytes: 1e9, // 約 1GB
        maxRssBytes: 1e9,
        maxEventLoopUtilization: 0.98
    });

    await app.register(cors, {
        origin: false
    });

    return app;
}