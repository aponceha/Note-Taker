const router = require('express').Router();
const path = require('path');
const api = require('./api');



// GET Route for notes page
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

router.use('/api', api);

// GET wildcard route for index page
router.get('*',(req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;