export const dayHM12ToSeconds = (dhm12: string) => {
  const [day, HM, AMPM] = dhm12.split(" "); // Sunday, 8:00 AM
  const [hour, minute] = HM.split(":");

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayIndex = daysOfWeek.indexOf(day.toLowerCase());
  const currentDayIndex = new Date().getUTCDay();

  const hour24 = AMPM === "AM" ? Number(hour) : Number(hour) + 12;
  const dayDiff =
    dayIndex >= currentDayIndex
      ? dayIndex - currentDayIndex
      : dayIndex - currentDayIndex + 7;

  const daySeconds = dayDiff * 24 * 60 * 60;
  const hourSeconds = hour24 * 60 * 60;
  const minuteSeconds = Number(minute) * 60;
  const totalSeconds = daySeconds + hourSeconds + minuteSeconds;

  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const contestTimeSeconds = currentDate.getTime() + totalSeconds * 1000;
  // console.log(contestTimeSeconds, new Date(contestTimeSeconds).toUTCString(), new Date(contestTimeSeconds).toString());
  // console.log(new Date(contestTimeSeconds).toUTCString());
  return contestTimeSeconds / 1000;
};

export const convertHHMMSSToSeconds = (timeString: string): number | null => {
  // Regular expression to match different time formats
  const timeRegex = /^(\d{1,2}):?(\d{0,2}):?(\d{0,2})$/;

  const match = timeString.match(timeRegex);

  if (!match) {
    return null; // Invalid time format
  }

  const [, hours, minutes, seconds] = match.map(Number);

  // Calculate total seconds
  const totalSeconds =
    (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);

  return totalSeconds;
};
