# cylab-fastify-starter

這是寫給 cylab 裡想要做後端的鐵鐵們的範例，我剛接觸 fastify 不久，還請鐵鐵們一起討論改進

## 常用套件
- helmet
- close-with-grace
- @fastify/under-pressure
- @fastify/cors
    - [MDN -跨來源資源共用（CORS）](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
    - 主要用於安全性問題的套件
    - 此安全性問題為只允許某些網域(通常最好只允許相同網域)的請求，而不允許其他網域的請求
- env-schema
    - 對 .env 環境變數做檢查
- @fasitfy/sensible
    - 提供許多 http 狀態處理以及錯誤處理的 plugin
- [desm](https://github.com/mcollina/desm)
    - 讓你可以在 ESM 使用 CommonJS 的路徑變數 (e.g. __dirname, __filename)


## 參考資源
- [mcollina/modular_monolith](https://github.com/mcollina/modular_monolith)
- [delvedor/fastify-example](https://github.com/delvedor/fastify-example)
- [[Fastify] Day30 - Graceful Shutdown](https://ithelp.ithome.com.tw/articles/10308747?sc=rss.iron)
    - 我們在這專案使用了 fastify 作者寫的 close-with-grace，但也許可以嘗試看看熱門的 @godaddy/terminus