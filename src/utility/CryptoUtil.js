const crypto = require('bcryptjs');
const SALT_ROUND = 10;

module.exports.encrypt = (text) => {
    return new Promise( (resolve,reject)=>{
       
        crypto.genSalt(SALT_ROUND,(err,salt)=>{
            if(err) reject(err);

            crypto.hash(text,salt,(err,hash)=>{       
                if(err) reject(err);      
                resolve(hash);
            });
        });

    });
}

module.exports.compare = (encryptedText, text)=>{
    return new Promise((resolve, reject) => {
        crypto.compare(text, encryptedText, (err, res) => {
            if(err || !res) reject();
            
            resolve(text);
        });
    });
}

