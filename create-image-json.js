// Copyright (c) 2017 Nicklas Israelsson (MIT)
//
// https://github.com/nicklasisraelsson/create-image-json

'use strict'

const fs = require('fs');
const sizeOf = require('image-size');

fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    let i = 1;
    let promises = [];
    let jsonFiles = [];
    let images = files.filter((fileName) => {
        let extension = fileName.substr(fileName.lastIndexOf('.')+1);
        return extension === 'jpg';
    });
    images.forEach((fileName) => {
        let promise = new Promise((resolve, reject) => {
            fs.stat(fileName, (stat_err, _st) => {
                if (stat_err) {
                    reject(stat_err);
                    return;
                }
                let size_err, dimensions = sizeOf(fileName);
                if (size_err) {
                    reject(size_err);
                    return;
                }
                let image = {
                    filenumber: i,
                    name: fileName,
                    width: dimensions.width,
                    height: dimensions.height
                };
                jsonFiles.push(image);
                i++;
                resolve();
            });
        });
        promises.push(promise);
    });

    Promise.all(promises).then(() => {
        fs.writeFile('images.json', JSON.stringify(jsonFiles), (err) => {
            if (err) {
                console.log(err);
            }
            console.log(`Found ${jsonFiles.length} items. Created ${__dirname + '/images.json' }. All done!`);
        });
    });
})
