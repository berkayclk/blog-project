var AuthConstants = require("../constants/AuthConstants");
const DateUtil = require('../utility/DateUtil');
const jwt = require('jsonwebtoken');

module.exports.getExpireDate = () => {
    var authorizedDurationType = DateUtil.DURATION_TYPES[AuthConstants.AUTHORIZED_DURATION_TYPE]; 
    var tokenExpireTime = AuthConstants.AUTHORIZED_DURATION * authorizedDurationType;
    return DateUtil.addTimeToNow( tokenExpireTime );
}

module.exports.generateToken = function (User) {
    var expireDate = this.getExpireDate();
    var token = jwt.sign({ _id: User._id.toHexString(), expireDate }, AuthConstants.JWT_SECRET).toString();
    var tokenModel = { expireDate, token };
    return tokenModel;
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