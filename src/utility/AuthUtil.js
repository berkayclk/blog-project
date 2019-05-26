var AuthConstants = require("../constants/AuthConstants");
const DateUtil = require('../utility/DateUtil');

module.exports.getExpireDate = () => {
    var authorizedDurationType = DateUtil.DURATION_TYPES[AuthConstants.AUTHORIZED_DURATION_TYPE]; 
    var tokenExpireTime = AuthConstants.AUTHORIZED_DURATION * authorizedDurationType;
    return DateUtil.addTimeToNow( tokenExpireTime );
}