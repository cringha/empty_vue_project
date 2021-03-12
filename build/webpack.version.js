
'use strict'
const fs = require('fs'); 
const path = require('path'); 
const packageConfig = require('../package.json');

const BUILD_DATE = `${ new Date().toISOString().substr(0, 10) }`;

module.exports = {
    APP_NAME : 'Easy-Edge' ,
    BUILD_DATE ,
    VERSION : packageConfig.version 
}; 