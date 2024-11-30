const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/data_source.db');

const multer = require("multer");

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/HTML/index.html"));
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
});


app.post('/api/fans', (req, res) =>{
  const name = req.body.name;
  const type = req.body.type;
  const smallInfo = req.body.smallInfo;
  const description = req.body.description;
  const image = req.body.image;
  const link = req.body.link;

  console.log(image);

  const pathForImage = "images/fans"
  var imageNewFilePath = `${pathForImage}/${image.split("\\").pop()}`;
  imageNewFilePath = imageNewFilePath.replace(/\//g, '\\');

  fs.rename(image, imageNewFilePath, (err) => {
    if (err) {
        console.error('Error moving the file:', err);
    } else {
        console.log('File moved successfully!');
    }
  });

  console.log(imageNewFilePath);

  db.all(`INSERT INTO FansOnly(name, type, smallInfo, description, image, link) VALUES(?,?,?,?,?,?) `, [name, type, smallInfo, description, imageNewFilePath, link], function (err){
    if(err){
      res.status(400).json({error: err.message});
      return;
    }
    // * successful Queer
    res.json({message : "fan added, id: this.lastID"}); 
  })
});


