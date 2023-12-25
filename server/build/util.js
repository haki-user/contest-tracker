export var dayHM12ToSeconds = function (dhm12) {
    var _a = dhm12.split(" "), day = _a[0], HM = _a[1], AMPM = _a[2]; // Sunday, 8:00 AM
    var _b = HM.split(":"), hour = _b[0], minute = _b[1];
    var daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    var dayIndex = daysOfWeek.indexOf(day.toLowerCase());
    var currentDayIndex = new Date().getUTCDay();
    var hour24 = AMPM === "AM" ? Number(hour) : Number(hour) + 12;
    var dayDiff = dayIndex >= currentDayIndex
        ? dayIndex - currentDayIndex
        : dayIndex - currentDayIndex + 7;
    var daySeconds = dayDiff * 24 * 60 * 60;
    var hourSeconds = hour24 * 60 * 60;
    var minuteSeconds = Number(minute) * 60;
    var totalSeconds = daySeconds + hourSeconds + minuteSeconds;
    var currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    var contestTimeSeconds = currentDate.getTime() + totalSeconds * 1000;
    // console.log(contestTimeSeconds, new Date(contestTimeSeconds).toUTCString(), new Date(contestTimeSeconds).toString());
    // console.log(new Date(contestTimeSeconds).toUTCString());
    return contestTimeSeconds / 1000;
};
