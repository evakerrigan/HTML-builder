const fs = require("fs");
const path = require("path");
const fsPromis = require('fs/promises');
const fileProjectPath = path.join(__dirname, "project-dist");
const fileStylePath = path.join(__dirname, "styles");
const bundle = path.join(fileProjectPath, 'bundle.css');

async function promisDir() {

  const files = await fsPromis.readdir(fileStylePath, { withFileTypes: true });

  let written = fs.createWriteStream(bundle, 'utf-8');

  for (let i=0; i<files.length; i++) {

    const fileName = files[i].name.split('.')[1];

    if (fileName === 'css' && files[i].isFile()) {
      const fullPath = path.join(fileStylePath, files[i].name);
      let readed = fs.createReadStream(fullPath, 'utf-8');
      readed.on('data', chunk => {
        written.write(` ${chunk} \n`);
      });
    }
  }
}
promisDir();