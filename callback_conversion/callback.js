const fs = require('fs');

function getUserDataCallback(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return callback(err);
    try {
      const user = JSON.parse(data);
      callback(null, user);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}

getUserDataCallback('./user.json', (err, user) => {
  if (err) {
    console.error('Callback Error:', err.message);
  } else {
    console.log('Callback User Data:', user);
  }
});
