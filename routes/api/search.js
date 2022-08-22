const express = require('express');
const client = require('@prisma/client');
const bodyParser = require('body-parser');
const router = express.Router();

const prisma = new client.PrismaClient();

router.use(bodyParser.json());

router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || req.params.q || req.body.q || '';
    if (q === '') return res.json([]);
    const issues = await prisma.issue.findMany({
      where: { title: { contains: q, mode: 'insensitive' } },
    });
    res.json(issues);
  } catch (e) {
    console.log(e);
    res.json({ error: 'Something went wrong' });
  }
});

module.exports = router;
