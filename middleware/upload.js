const multer = require('multer');

// Create multer upload instance
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully.');
});

module.exports = upload;
