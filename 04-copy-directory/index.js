const fs = require("fs");
const path = require("path");
const fsPromis = require('fs/promises');

const file4Path = path.join(__dirname, "files-copy");
const filePath = path.join(__dirname, "files");

async function promisDir() {

    await fsPromis.rm(file4Path, { recursive: true, force: true }, err => {
      if(err) throw err;
    });

    await fsPromis.mkdir(file4Path, { recursive: true }, err => {
      if(err) throw err;
    });
    copyDir();

}

promisDir();


function copyDir() {
  fs.readdir(filePath, (err, files) => {

  if (err) {
    throw err;
  }

files.forEach((file) => {
  fs.copyFile(path.join(filePath, file ), path.join(file4Path, file), (err) => {
    if (err) {
      throw err;
    }})
})

});
};

