const fs = require('fs').promises;

async function getUserDataAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const user = JSON.parse(data);
    console.log('Async/Await User Data:', user);
  } catch (err) {
    console.error('Async/Await Error:', err.message);
  }
}

getUserDataAsync('./user.json');
