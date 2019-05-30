var AuthConstants = require("../constants/AuthConstants");
const DateUtil = require('../utility/DateUtil');
const jwt = require('jsonwebtoken');

module.exports.getExpiresIn = () => {
    var authorizedDurationType = DateUtil.DURATION_TYPES[AuthConstants.AUTHORIZED_DURATION_TYPE];
    return AuthConstants.AUTHORIZED_DURATION + authorizedDurationType
}

module.exports.generateToken = function (User) {
    var expiresIn = this.getExpiresIn();
    var token = jwt.sign({ _id: User._id.toHexString() }, AuthConstants.JWT_SECRET, {expiresIn: expiresIn} ).toString();
    return token;
};

module.exports.parseToken = (token)=>{
    
    var payload = null;
    try {
        payload = jwt.verify(token, AuthConstants.JWT_SECRET);
    } catch (e) {  }

    return payload;
}

module.exports.generateHeaderKeyValue = function (token) {
   return {key : AuthConstants.AUTH_HEADER, value: AuthConstants.BEARER + token};
};

module.exports.getTokenFromHeader = function (req) {
    var header = req.header(AuthConstants.AUTH_HEADER);
    if(!header)
        return null;
    
    token = header.length > AuthConstants.BEARER.length ? header.substr(AuthConstants.BEARER.length) : null;
    return token;
 };