const _ = require('lodash');
module.exports.pickNonSensitiveObject = body => {
    if( !body )
        return null;
        
    var user = _.pick( body , ["_id","Fullname","Username","Password","Contact"] );
    return user;
}

module.exports.pickPublicVisibleFields = user => {
    if( !user )
        return null;
        
    var user = _.pick( user , this.PUBLIC_VISIBLE_FIELDS );
    return user;
}

module.exports.SENSITIVE_USER_FIELDS = Object.freeze( [
    "Password"
]);

module.exports.PUBLIC_VISIBLE_FIELDS = Object.freeze( [
    "_id",
    "Username",
    "Fullname"
]);