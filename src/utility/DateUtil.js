module.exports.addTimeToNow = (time) => {
    time = time || 0;
    var now = Date.now();
    return now + time;
} 

let DURATION_TYPES = {
    DAY: "d",
    HOUR: "h",
    MINUTE: "m"
}
module.exports.DURATION_TYPES = Object.freeze(DURATION_TYPES);
