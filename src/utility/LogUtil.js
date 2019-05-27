module.exports.LogInfo = (text) =>{
    var now = new Date();
    console.error( "\x1b[34m",`[INFO] -- ${now.toLocaleString()} -- ${text}`);
};

module.exports.LogWarning = (text) =>{
    var now = new Date();
    console.error( "\x1b[33m",`[WARNING] -- ${now.toLocaleString()} -- ${text}`);
};

module.exports.LogError = (text) =>{
    var now = new Date();
    console.error( "\x1b[31m",`[ERROR] -- ${now.toLocaleString()} -- ${text}`);
};