const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/data_source.db');
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require('fs'); // Add fs module
const app = express();

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for the uploaded file
    cb(null, path.join(__dirname, 'public/images/fans'));
  },
  filename: function (req, file, cb) {
    // Use the original filename (or modify it if needed)
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

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

app.get('/api/fans', (req, res) => {
  db.all('SELECT * FROM FansOnly', [], (err, rows) => {
    // * successful Query
    res.json({ fans: rows });
  });
});

// POST route to handle file upload and other form data
app.post('/api/fans', upload.single('image'), (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const smallInfo = req.body.smallInfo;
  const description = req.body.description;
  const link = req.body.link;

  const image = req.file; // This is the uploaded file object
  if (!image) {
    return res.status(400).json({ error: "Image file is required." });
  }

  // The image path relative to the 'public' folder
  const imagePath = `images/fans/${image.filename}`;

  console.log(imagePath); // Log the image path

  db.all(`INSERT INTO FansOnly(name, type, smallInfo, description, image, link) VALUES(?,?,?,?,?,?) `, 
    [name, type, smallInfo, description, imagePath, link], function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      // * successful Query
      res.json({ message: "Fan added, id: " + this.lastID });
  });
});
