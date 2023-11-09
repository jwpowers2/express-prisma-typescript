//const bodyParser = require("body-parser");
//const express,{Express} = require('express')
import express, {Express, Request, Response,Router} from 'express';
import routes from "./server/config/routes.js"

const app:Express = express()
const port = 5000

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//require("./server/config/prisma");
//require("./server/config/routes.js")(app);
//import prisma from "./server/config/prisma.js";

routes(app)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})