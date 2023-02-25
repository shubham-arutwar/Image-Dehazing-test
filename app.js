const express = require('express');
const multer  = require('multer');
const { spawn } = require('child_process');
const app = express();
const port = 3000;

// Configure Multer middleware to store uploaded files in the "uploads" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Serve index.html file on GET request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle image file uploads on POST request using Multer middleware
app.post('/upload', upload.single('image'), (req, res) => {
  // Execute the Python script as a child process
  const pythonProcess = spawn('python', ['demo.py', req.file.path]);

  // Log any output from the Python script to the console
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  // Send the uploaded image as a response
  res.sendFile(__dirname + '/' + req.file.path);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
