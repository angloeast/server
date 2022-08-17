var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dummyResponseGenerator = () => {
  const data = [];
  let len = Math.ceil(Math.random() * 100);
  for (let i = 1; i <= len; i++) {
    data.push({
      id: i,
      imageUri: 'https://picsum.photos/400/180',
      title: 'string',
      issueNumber: i,
      issueDate: new Date(),
    });
  }
  return data;
};

router.get('/issues', function (req, res, next) {
  res.json({ data: dummyResponseGenerator() });
});

router.get('/issues/:id', function (req, res, next) {
  res.json({ hello: 'What' });
});

router.patch('/issues', function (req, res, next) {
  res.json({ hello: 'What' });
});

router.delete('/issues/:id', function (req, res, next) {
  res.json({ hello: 'What' });
});

module.exports = router;
