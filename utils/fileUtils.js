const path = require('path');

const uploadPath = path.join(path.join(path.dirname(__dirname), 'tmp'), 'uploads');

module.exports = {
  uploadPath,
};
