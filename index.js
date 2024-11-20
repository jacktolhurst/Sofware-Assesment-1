const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/data_source.db');

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(5000, () =>
  console.log(
    "Server is running on Port 5000, visit http://localhost:5000/ or http://127.0.0.1:5000 to access your website"
  )
);

app.get('/api/fans', (req, res) =>{
    db.all('SELECT * FROM FansOnly', [], (err,rows) =>{
        // * successful Queer
        res.json({fans : rows}); 
    })
})

