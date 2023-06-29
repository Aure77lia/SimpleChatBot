import express from "express";

//view engine : render web pages using templates files
//config view engine to ejs
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = configViewEngine;