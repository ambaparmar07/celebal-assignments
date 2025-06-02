//manual code
// const fs = require('fs');
// const path = require('path');

// const fileName = 'data.txt';
// const filePath = path.join(__dirname, fileName);
// const fileContent = 'Hello! This file is created in Node.js!';

// try {
//     fs.writeFileSync(filePath, fileContent);
//     console.log('File written successfully.');
// } catch (err) {
//     console.error('Error writing file:', err.message);
// }

// try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     console.log('File content:\n' + data);
// } catch (err) {
//     console.error('Error reading file:', err.message);
// }

// try {
//     fs.unlinkSync(filePath);
//     console.log('File deleted successfully.');
// } catch (err) {
//     console.error('Error deleting file:', err.message);
// }

//by commands
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("File Management Tool:");
console.log("1. Create a file");
console.log("2. Read a file");
console.log("3. Delete a file");
console.log("4.  Exit");

rl.question("Enter your choice (1-4): ", function(choice) {
    switch (choice) {
        case '1':
            rl.question("Enter file name to create: ", function(fileName) {
                rl.question("Enter file content: ", function(content) {
                    const filePath = path.join(__dirname, fileName);
                    fs.writeFile(filePath, content, (err) => {
                        if (err) console.error("Error creating file:", err.message);
                        else console.log("File created successfully.");
                        rl.close();
                    });
                });
            });
            break;

        case '2':
            rl.question("Enter file name to read: ", function(fileName) {
                const filePath = path.join(__dirname, fileName);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) console.error("Error reading file:", err.message);
                    else {
                        console.log("File content:\n" + data);
                    }
                    rl.close();
                });
            });
            break;

        case '3':
            rl.question("Enter file name to delete: ", function(fileName) {
                const filePath = path.join(__dirname, fileName);
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Error deleting file:", err.message);
                    else console.log("File deleted successfully.");
                    rl.close();
                });
            });
            break;

        case '4':
            console.log("Exiting...");
            rl.close();
            break;

        default:
            console.log("Invalid choice. Please enter 1, 2, 3, or 4.");
            rl.close();
    }
});
