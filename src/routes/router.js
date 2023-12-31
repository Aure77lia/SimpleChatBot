const 
    chatbotController = require("../controller/chatbotController"),
    express = require('express');

let router = express.Router();

let initWebRoutes = (app) =>{
    router.get("/webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);

    return app.use("/",router);
};

module.exports = initWebRoutes;