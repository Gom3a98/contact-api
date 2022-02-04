"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
require("dotenv").config();
console.log(process.env.PASSWORD);
const DB = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    portco: process.env.CONNECTION_PORT,
    ssl: {
        rejectUnauthorized: false,
    }
});
exports.default = DB;
//# sourceMappingURL=connect.js.map