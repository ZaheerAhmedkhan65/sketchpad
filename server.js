const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./connection');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));



// Endpoint to save user data
app.post('/save', (req, res) => {
  const { student, session, drawings } = req.body;

  const query = 'INSERT INTO drawings (student, session, drawings) VALUES (?, ?, ?)';
  db.query(query, [student, session, JSON.stringify(drawings)], (err, results) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
      return;
    }
    res.status(200).send('Data saved successfully');
  });
});

// Render the index page using EJS
app.get('/', (req, res) => {
  res.render('index', { title: 'Sketch Pad' }); // Pass data to the EJS template
});

// Endpoint to get drawings data
app.get('/drawings', (req, res) => {
  const query = 'SELECT * FROM drawings';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }

    const rawDataFolder = path.join(__dirname, 'public', 'data', 'raw');

    // Ensure the data/raw folder exists
    if (!fs.existsSync(rawDataFolder)) {
      fs.mkdirSync(rawDataFolder, { recursive: true });
    }

    // Array to track new files created
    const newFilesCreated = [];

    results.forEach((userDrawing) => {
      const fileName = `${userDrawing.session}.json`;
      const filePath = path.join(rawDataFolder, fileName);

      // Check if the file already exists
      if (!fs.existsSync(filePath)) {
        // File doesn't exist, so create it
        fs.writeFileSync(filePath, JSON.stringify(userDrawing, null, 2), 'utf-8');
        newFilesCreated.push(fileName); // Track the new file
      }
    });

    if (newFilesCreated.length > 0) {
      res.json({
        message: 'New user drawings saved to JSON files',
        newFiles: newFilesCreated,
      });
    } else {
      res.json({
        message: 'No new user drawings found. All files already exist.',
      });
    }
  });
});

// Render the viewer page using EJS
app.get('/viewer', (req, res) => {
  res.render('viewer', { title: 'Viewer' }); // Pass data to the EJS template
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});