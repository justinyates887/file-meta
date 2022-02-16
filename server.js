var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

const upload = multer().single('upfile');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload, (req, res) => {
  if (req.file) {
    const { originalname: name, mimetype: type, size } = req.file;
      res.json({
        name,
        type,
        size
      });
  } else {
    res.json({
      errror: 'no file selected'
    });
  }
});


const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Listening on port ' + port)
});
