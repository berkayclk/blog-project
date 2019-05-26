var AuthConstants = require("../constants/AuthConstants");
const DateUtil = require('../utility/DateUtil');
const jwt = require('jsonwebtoken');

module.exports.getExpireDate = () => {
    var authorizedDurationType = DateUtil.DURATION_TYPES[AuthConstants.AUTHORIZED_DURATION_TYPE]; 
    var tokenExpireTime = AuthConstants.AUTHORIZED_DURATION * authorizedDurationType;
    return DateUtil.addTimeToNow( tokenExpireTime );
}

module.exports.generateToken = function (User) {
    var expireDate = getExpireDate();
    var token = jwt.sign({ _id: User._id.toHexString(), expireDate }, AuthConstants.JWT_SECRET).toString();
    var tokenModel = { expireDate, token };
    return tokenModel;
};