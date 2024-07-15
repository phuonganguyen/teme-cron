import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
.on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;


