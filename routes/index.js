const express = require('express');
const router = express.Router();
const path = require('path');
const fileUtils = require('./../utils/fileUtils');

router.use('/uploads/:filename', async (req, res, next) => {
  try {
    const filename = req.params.filename;
    res.sendFile(path.join(fileUtils.uploadPath, filename), {}, (err) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
