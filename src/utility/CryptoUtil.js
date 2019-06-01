const crypto = require('bcryptjs');
const SALT_ROUND = 10;

module.exports.encrypt = async (text) => {
    const salt = await crypto.genSalt(SALT_ROUND);
    let hashed = await crypto.hash(text,salt);
    return hashed;
}

module.exports.compare = async (encryptedText, text)=>{
    let isEqual = await crypto.compare(text, encryptedText)
    if( !isEqual ) return new Error("Texts are not equals.")

    return text;
}

