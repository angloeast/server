const express = require('express');
const client = require('@prisma/client');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const numberUtils = require('./../../utils/numberUtils');

const prisma = new client.PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const dummyResponseGenerator = () => {
  const data = [];
  let len = Math.ceil(Math.random() * 100);
  for (let i = 1; i <= len; i++) {
    data.push({
      id: i,
      imageUri: 'https://picsum.photos/400/180',
      title: 'string',
      issueNumber: i,
      issueDate: new Date().getTime(),
    });
  }
  return data;
};

// router.use('/issues', (req, res, next) => {
//   console.log(req.params)
//   console.log(req.body)
//   console.log(req.query)
//   next();
// });

router.get('/issues', async (req, res) => {
  try {
    const issues = await prisma.issue.findMany();
    res.json(issues);
  } catch (e) {
    res.json({ error: 'Something went wrong' });
  }
});

router.get('/issues/:id', async (req, res) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: req.params.id || req.body.id,
      },
    });
    res.json(issue);
  } catch (e) {
    res.json({ error: 'Something went wrong' });
  }
});

router.post('/issues', upload.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    const max = 10000000;
    const issue = await prisma.issue.create({
      data: {
        title,
        imageUri: req.file.filename,
        issueNumber: numberUtils.generateRandomNumber(max),
      },
    });
    res.json(issue);
  } catch (e) {
    res.json({ error: 'Something went wrong' });
  }
});

router.patch('/issues/:id', async (req, res) => {
  try {
    const { id, title } = req.body;
    const issue = await prisma.issue.update({
      where: { id },
      data: { title },
    });
    console.log(issue);
    res.json(issue);
  } catch (e) {
    console.log(e);
    res.json({ error: 'Something went wrong' });
  }
});

router.delete('/issues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await prisma.issue.delete({
      where: {
        id,
      },
    });
    res.json(issue);
  } catch (e) {
    res.json({ error: 'Something went wrong' });
  }
});

router.get('/issues', function (req, res, next) {
  res.json(dummyResponseGenerator());
});

module.exports = router;
