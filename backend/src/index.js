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
  // const ppl = users.map(p => ({
  //   username: p.username,
  //   password: p.password,
  //   email: p.email
  // }));
  // connection.execute("SELECT `username` FROM `accounts`").then(([rows]) => {
  //   res.render("/", {
  //     username: rows[1].name
  //   });
  // connection.query("SELECT `username` FROM `accounts`", function(
  //   error,
  //   results,
  //   fields
  // ) {
  //   if (error) throw error;
  //   res.render("/", {
  //     username: rows[1].name
  //   });
  // });
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
  //res.send(ppl);
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
  const { username, password, email } = req.body;
  const id = Math.round(Math.random() * 10000);
  console.log("am here");
  pool.query(
    "insert into users values ($1, $2, $3, $4)",
    [id, username, password, email],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      // res.status(201).send(`User added with ID: ${id}`);
      // console.log("I AM HERE");
      res.status(200).send();
    }
  );
  //res.status(200).send();
});

// // insert a new answer to a question
// app.post("/answer/:id", (req, res) => {
//   const { answer } = req.body;

//   const question = questions.filter(q => q.id === parseInt(req.params.id));
//   if (question.length > 1) return res.status(500).send();
//   if (question.length === 0) return res.status(404).send();

//   question[0].answers.push({
//     answer
//   });

//   res.status(200).send();
// });

// start the server
app.listen(8081, () => {
  console.log("listening on port 8081");
});
