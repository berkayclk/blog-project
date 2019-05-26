const _ = require('lodash');
module.exports.pickNonSensitiveObject = body => {
    if( !body )
        return null;
        
    var user = _.pick( body , ["_id","Fullname","Username","Password","Contact"] );
    return user;
}