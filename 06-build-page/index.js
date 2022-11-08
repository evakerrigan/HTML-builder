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
const indexHtml = path.join(fileProjectPath, "index.html");


promisDir();

async function promisDir() {

  //удаляем папку project-dist
  await fsPromis.rm(fileProjectPath, { recursive: true, force: true }, err => {
    if(err) throw err;
  });
  //создаем папку project-dist
  await fsPromis.mkdir(fileProjectPath, { recursive: true }, err => {
    if(err) throw err;
  });
  addStyle();
  addHtml();
  copyFiles();
}


async function addStyle() {
  //читаем папку с файлами стилей и заносим их список в переменную
  const files = await fsPromis.readdir(fileStylePath, { withFileTypes: true });
  //создаем файл style.css
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

  //создаем список из файлов после чтения папки компонентов
  const htmlFiles = await fsPromis.readdir(fileComponentPath, { withFileTypes: true });

  //создаем файл index.html
  let written = fs.createWriteStream(indexHtml, 'utf-8');

    //создаем массив из списка файлов компонент
    const componentsArr = await fsPromis.readdir(fileComponentPath, err => {
      if (err) throw err;
    })

    //создаем переменную в которую копируем файл template
    let readed = await fsPromis.readFile(template, 'utf8');

    //циклом проходимся по массиву компонент
    for (let i = 0; i < componentsArr.length; i++) {
      //заносим в переменную расширение текущей компоненты
      const fileExtention = componentsArr[i].split('.')[1];
      //заносим в переменную название текущей компоненты
      const componentName = componentsArr[i].split('.')[0];
      //проверяем, является ли эта компонента html-файлом
      if (fileExtention === 'html') {
            //заносим в переменную содержимое текущего компонента
            const templateItem = await fsPromis.readFile(path.join(fileComponentPath, componentsArr[i]), 'utf8');
            //в переменной в которой лежит файл template заменяем переменную на содержимое текущего компонента
            readed = readed.replace(`{{${componentName}}}`, templateItem);
      }
    }
    //в файл index.html записываем то что получилось в переменной readed
    written.write(readed, 'utf8');

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
                  //проходим циклом по каждому файлу в этой папке и копируем каждый файл в такую же папку в папке project-dist
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
