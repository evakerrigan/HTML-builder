const fs = require("fs");
const path = require("path");
const fsPromis = require('fs/promises');

const fileProjectPath = path.join(__dirname, "project-dist");
const fileComponentPath = path.join(__dirname, "components");
const fileProjectAssetsPath = path.join(fileProjectPath, "assets");
const fileAssetsPath = path.join(__dirname, "assets");
const fileStylePath = path.join(__dirname, "styles");
const template = path.join(__dirname, "template.html");
const style = path.join(fileProjectPath, "style.css");
const html = path.join(fileProjectPath, "index.html");


promisDir();

async function promisDir() {

  await fsPromis.rm(fileProjectPath, { recursive: true, force: true }, err => {
    if(err) throw err;
  });

  await fsPromis.mkdir(fileProjectPath, { recursive: true }, err => {
    if(err) throw err;
  });
  addStyle();
  addHtml();
  copyFiles();
}


async function addStyle() {

  const files = await fsPromis.readdir(fileStylePath, { withFileTypes: true });

  let written = fs.createWriteStream(style, 'utf-8');

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

async function addHtml() {

  const htmlFiles = await fsPromis.readdir(fileComponentPath, { withFileTypes: true });

  let written = fs.createWriteStream(html, 'utf-8');

  for (let i=0; i<htmlFiles.length; i++) {

    const fileName = htmlFiles[i].name.split('.')[0];
    const fileExtention = htmlFiles[i].name.split('.')[1];

    if (fileExtention === 'html' && htmlFiles[i].isFile()) {

      if (fileName === 'articles') {
        console.log('article');
      }

      if (fileName === 'footer') {
        console.log('footer');
      }

      if (fileName === 'header') {
        console.log('header');
      }
    }

  }

}

async function copyFiles() {

  //создаем папку assets в папке project-dist
  await fsPromis.mkdir(fileProjectAssetsPath, { recursive: true }, err => {
    if(err) throw err;
  });

  //читаем папку assets, получаем массив со списком папок внутри
  fs.readdir(fileAssetsPath, (err, assetsDir) => {

    //циклом проходимся по массиву со списком папок
    assetsDir.forEach((dir) => {

          //назначаем переменной имя папки
          let dirName = dir;
          console.log('dirName =', dirName);
          //назначаем переменной путь до папки внутри папки assets
          let fileAssetsPathDir = path.join(fileAssetsPath, dirName);
          //назначаем переменной путь до папки с таким же именем в папке project-dist
          let fileProjectAssetsPathDir = path.join(fileProjectAssetsPath, dirName);
          //создаем в папке project-dist папку с таким же именем как в папке assets
          fsPromis.mkdir(fileProjectAssetsPathDir, { recursive: true }, err => {
            if(err) throw err;
          });
                //читаем эту текущую папку в папке assets
                fs.readdir(fileAssetsPathDir, (err, assetsFiles) => {

                  if (err) {
                    throw err;
                  }

                  assetsFiles.forEach((file) => {
                    fs.copyFile(path.join(fileAssetsPathDir, file ), path.join(fileProjectAssetsPathDir, file), (err) => {
                      if (err) {
                        throw err;
                      }})
                  })

                });

    })

  });



};
