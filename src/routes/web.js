import express from "express";
import chatbotController from "../controllers/chatbotController";
import { route } from "express/lib/application";

let router = express.Router();

let initWebRoutes = (app) =>{
    router.get("/", chatbotController.test);
    router.get("/webhook", chatbotController.getWebhook);
    router.get("/webhook", chatbotController.postWebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;