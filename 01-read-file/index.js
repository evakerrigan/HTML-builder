const fs = require('fs');
const path = require('path');

const readed = fs.createReadStream(path.join(__dirname, 'text.txt'));

readed.on('data', chunk => {
    console.log(chunk.toString());
});