let AuthConstants = {
    AUTHORIZED_DURATION: process.env.AUTHORIZED_DURATION || 7,
    AUTHORIZED_DURATION_TYPE: process.env.AUTHORIZED_DURATION_TYPE || "DAY"
};

module.exports = Object.freeze(AuthConstants);