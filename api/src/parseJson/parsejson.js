'use strict';

const path = require('path');

const fs = require('fs');

let rawdata = fs.readFileSync(path.join(__dirname,"../../../Assets/ADIDAS.json"));
let student = JSON.parse(rawdata);
console.log(student);