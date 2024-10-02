const fs = require('fs');
const path = require('path');
const util = require('util');
let testPath = './test'; //실행위치 Exercise 2.2 기준

const readdir = util.promisify(fs.readdir);

const printDir = async testPath => {
    try {
        const files = await readdir(testPath, {withFileTypes: true});
        for (const file of files) {
            fs.stat(path.join(file.parentPath, file.name), (err, stats) => {
                if (stats.isDirectory())
                    printDir(path.join(file.parentPath, file.name));
                if (path.extname(file.name) == '.js') 
                    console.log(path.join(file.parentPath, file.name));
            });
        }
    } catch (err) {
        console.error(err);
    }
};

printDir(testPath);