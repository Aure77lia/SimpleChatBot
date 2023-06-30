require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";

let app = express();

// config view engine
viewEngine(app);

// config body-parser
app.use(bodyParser.json());
// console.log("json: "+bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// console.log("urlencoded: "+bodyParser.urlencoded({extended: true}));

// init web routes
initWebRoutes(app);

// config port with a default value of 8080
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("App running, port used: "+port);
});