const fs = require("fs");
const path = require("path");
const { stdout } = process;

const filePath = path.join(__dirname, "secret-folder");

fs.readdir(filePath, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    // const fullPath = `${filePath}/${file}`;
    const fullPath = path.join(filePath, file);
    fs.stat(fullPath, (err, stats) => {
      if (err) {
        throw err;
      }
      if (stats.isFile()) {
        let name = file.split(".");
        let size = stats.size.toString();
        stdout.write(`${name[0]} - ${name[1]} - ${size/1000} Kb \n`);
      }
    });
  });
});