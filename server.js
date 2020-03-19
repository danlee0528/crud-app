const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mysql = require("mysql");
const port = process.env.PORT || 8080;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer1234",
  database: "cmpt470"
});

const app = express();

db.connect(err => {
  if (err) throw err;
  console.log("MysQL connected...");
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server Listening
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

// Create table
app.get('/createusertable', (req,res) => {
    let sql = 'CREATE TABLE Users'+
    '(id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, age INT NOT NULL, ' + 
    'gender VARCHAR(255) NOT NULL, occupation VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, salary INT NOT NULL, maritalStatus VARCHAR(255) NOT NULL, PRIMARY KEY(id))';
  
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log("Posts table created...");
      console.log(result);
      res.send(result);
    });
  });
  
// Show current users
app.get("/", (req, res) => {
    let sql = "SELECT * FROM Users";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.render("index", {
            title: "CRUD Operation using NodeJS / ExpressJS / MySQL",
             users: results
        });
    });
});

// Show form
app.get('/adduser', (req, res) => {
    res.render("add_user", {
        title: "SURVEY FORM",
    });
});

// Add a new user
app.post('/save', (req, res) => {
    let user = {name: req.body.name, email: req.body.email, age: req.body.age, gender: req.body.gender, occupation: req.body.occupation, city: req.body.city, salary: req.body.salary, maritalStatus: req.body.maritalStatus};
    let sql = 'INSERT INTO Users SET ?';
    let query = db.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log('User added...');
      res.redirect('/');
    });
});


// Edit user
app.get('/edit/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `SELECT * FROM Users WHERE id = ${userId}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('User added...');
      res.render('edit_user', {
          title: 'EDIT USER',
          user: result[0]
      });
    });
});

// Save update of user
app.post('/update', (req, res) => {
    let user = {name: req.body.name, email: req.body.email, age: req.body.age, gender: req.body.gender, occupation: req.body.occupation, city: req.body.city, salary: req.body.salary, maritalStatus: req.body.maritalStatus};
    const userId = req.body.id;
    let sql = `UPDATE Users SET ? WHERE id = ${userId}`;
    let query = db.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log('User added...');
      res.redirect('/');
    });
});

// Delete a user
app.get('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE FROM Users WHERE id = ${userId}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('User added...');
      res.redirect('/');
    });
});
