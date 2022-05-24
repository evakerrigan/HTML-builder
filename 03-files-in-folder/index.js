const fs = require("fs");
const path = require("path");
const { stdout } = process;

const filePath = path.join(__dirname, "/secret-folder");

fs.readdir(filePath, (err, files) => {
  if (err) {
    throw err;
  }
 

    files.forEach((file) => {

      const fullPath =  `${filePath}/${file}`
      console.log(fullPath);

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          throw err;
        }

      if (stats.isFile()) {

        //console.log(stats);

        let name = file.split(".");
        let size = stats.size;

        //stdout.write(file);
        stdout.write(`\n`);
        stdout.write(name[0]);
        stdout.write(`\n`);
        stdout.write(name[1]);
        stdout.write(size);

        //stdout.write('${name} - ${ext} - ${size} 'bite' \n');
      }

      //console.log(stats);



    });
  });
});
