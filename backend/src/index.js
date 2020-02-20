//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// define the Express app
const app = express();

// the database
// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "nodelogin",
//   port: 3306
// });

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "users",
  password: "password"
});

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

// retrieve all users
app.get("/", (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// retrieve all statistics
app.get("/statistics", (req, res) => {
  pool.query("SELECT * FROM statistics", (error, results) => {
    if (error) {
      throw error;
    }
    console.log("reslTS", results.row);
    res.status(200).json(results.rows);
  });
});

// insert a new user
app.post("/newUser", (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body, "REQ BODY");
  const id = Math.round(Math.random() * 10000);
  pool.query(
    "insert into users values ($1, $2, $3, $4)",
    [id, fullname, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      res.status(200).send();
    }
  );
});

// start the server
app.listen(8081, () => {
  console.log("listening on port 8081");
});
