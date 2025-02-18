// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const comments = require('./comments.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'pug');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set routes
app.get('/', (req, res) => {
  res.render('index', { comments });
});

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);

  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) throw err;
    console.log('Comment added');
  });

  res.redirect('/');
});

// Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});