const Pool = require('pg').Pool;
require("dotenv").config();
console.log(process.env.PASSWORD)
const DB = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  portco: process.env.CONNECTION_PORT,
})

export default DB;