const fs = require('fs').promises;

function getUserDataPromise(filePath) {
  return fs.readFile(filePath, 'utf8')
    .then(data => JSON.parse(data));
}

getUserDataPromise('./user.json')
  .then(user => {
    console.log('Promise User Data:', user);
  })
  .catch(err => {
    console.error('Promise Error:', err.message);
  });
