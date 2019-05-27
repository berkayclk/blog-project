const colors = require('colors/safe');

module.exports.LogInfo = (text) =>{
    var now = new Date();
    console.error( colors.blue(`[INFO] -- ${now.toLocaleString()} -- ${text}`));
};

module.exports.LogWarning = (text) =>{
    var now = new Date();
    console.error( colors.yellow(`[WARNING] -- ${now.toLocaleString()} -- ${text}`));
};

module.exports.LogError = (text) =>{
    var now = new Date();
    console.error( colors.red(`[ERROR] -- ${now.toLocaleString()} -- ${text}`));
};