
// 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  >>>>>>> github access token

import express, { Router } from "express";
import logger from "./config/logger";
import router from "./routes";
import bodyParser from "body-parser";
import path from "path"
require("dotenv").config();
const app = express();
let port = Number(process.env.PORT || 4000)
app.listen(port , ()=>{
    logger.info(`App is running at http://localhost:${port}`);
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use("/api" , router);


export default app;
