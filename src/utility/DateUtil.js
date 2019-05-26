module.exports.addTimeToNow = (time) => {
    time = time || 0;
    var now = Date.now();
    return now + time;
} 

let DURATION_TYPES = {
    DAY: 24 * 60 * 60 * 1000,
    HOUR: 60 * 60 * 1000,
    MINUTE: 60 * 1000
}
module.exports.DURATION_TYPES = Object.freeze(DURATION_TYPES);
