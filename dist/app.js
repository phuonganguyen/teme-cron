"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cronJobs_1 = __importDefault(require("./cronJobs"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
const server = app
    .listen(port, () => console.log(`Example app listening on port ${port}!`))
    .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
(0, cronJobs_1.default)();
