// Copyright (c) 2017 Nicklas Israelsson (MIT)
//
// https://github.com/nicklasisraelsson/create-image-json

'use strict'

const fs = require('fs');
const sizeOf = require('image-size');

fs.readdir(__dirname, (_, files) => {
    let i = 1;
    let jsonFiles = [];
    let images = files.filter((fileName) => {
        let extension = fileName.substr(fileName.lastIndexOf('.')+1);
        return extension === 'jpg';
    });
    images.forEach((fileName) => {
        let _, dimensions = sizeOf(fileName);
        let image = {
            filenumber: i,
            name: fileName,
            width: dimensions.width,
            height: dimensions.height
        };
        jsonFiles.push(image);
        i++;
    });

    fs.writeFile('images.json', JSON.stringify(jsonFiles), (_) => {
        console.log(`Found ${jsonFiles.length} items. Created ${__dirname + '/images.json' }. All done!`);
    });
})
