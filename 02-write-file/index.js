const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;


fs.writeFile(
    path.join(__dirname, '' ,'text.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

stdout.write('Введите текст:\n');
stdin.on('data', data => {

    const dataStringified = data.toString().trim();

    if(dataStringified === 'exit') {
        stopWrite();
    }
    fs.appendFile(
        path.join(__dirname, '' ,'text.txt'),
        data,
        (err) => {
            if (err) throw err;
        }
    );
});

function stopWrite() {
    process.on('exit', () => stdout.write('Удачи!'));
    process.exit();
} 

process.on('SIGINT', function() {
    stopWrite();
});

