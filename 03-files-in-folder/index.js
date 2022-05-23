const fs = require("fs");
const path = require("path");
const { stdout } = process;

const filePath = path.join(__dirname, "/secret-folder");

fs.readdir(filePath, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    fs.stat(path, (err, stats) => {
      //if (stats.isFile()) {

        let name = file.split(".");
        let ext = path.extname;
        let size = stats['size'];

        stdout.write(file);
        stdout.write(ext);
        stdout.write(size);

        //stdout.write('${name} - ${ext} - ${size} 'bite' \n');
      //}
    });
  });
});
