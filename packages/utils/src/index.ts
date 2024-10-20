export const dayHM12ToSeconds = (dhm12: string): number => {
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
  return contestTimeSeconds / 1000;
};

export const convertDateTimeToAbsoluteSeconds = (
  dateString: string, // 31 Jan 2024
  timeString: string // Wed 20:00
): number => {
  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const [day, monthStr, year] = dateString.split(" ");
  const [_, time] = timeString.split(" ");

  const month = months[monthStr];
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date(
    parseInt(year),
    month,
    parseInt(day),
    hours,
    minutes,
    0,
    0
  );

  return Math.floor(date.getTime() / 1000);
};

export const convertTimeToSeconds = (timeString: string): number => {
  const iso8601DurationRegex = /^PT(?:(\d+)H)?(?:(\d+)M)?$/i; // PT2H30M
  const colonSeparatedTimeRegex = /^(\d+):(\d+)\s*hrs?$/i; // 2:30 hrs or 2:30 HRs or 2:30 hours
  const hoursRegex = /^(\d+)\s*hrs?$/i; // 2 hrs
  const minutesRegex = /^(\d+)\s*mins?$/i; // 30 mins
  const hoursAndMinutesRegex = /^(\d+)(?:\s*hrs?)?\s*(\d+)\s*mins?$/i; // 2 hrs 30 mins
  const floatHoursRegex = /^(\d+)\.(\d+)\s*hrs?$/i; // 2.5 hrs
  const hhmmRegex = /^(\d+):(\d+)$/; // 02:30

  const toSeconds = (hours: number, minutes: number): number => {
    return hours * 3600 + minutes * 60;
  };

  let hours = 0;
  let minutes = 0;

  if (iso8601DurationRegex.test(timeString)) {
    const match = timeString.match(iso8601DurationRegex);
    if (match) {
      hours = parseInt(match[1]) || 0;
      minutes = parseInt(match[2]) || 0;
    }
  } else if (colonSeparatedTimeRegex.test(timeString)) {
    const match = timeString.match(colonSeparatedTimeRegex);
    if (match) {
      hours = parseInt(match[1]);
      minutes = parseInt(match[2]);
    }
  } else if (hoursAndMinutesRegex.test(timeString)) {
    const match = timeString.match(hoursAndMinutesRegex);
    if (match) {
      hours = parseInt(match[1]) || 0;
      minutes = parseInt(match[2]) || 0;
    }
  } else if (hoursRegex.test(timeString)) {
    const match = timeString.match(hoursRegex);
    if (match) {
      hours = parseInt(match[1]);
    }
  } else if (minutesRegex.test(timeString)) {
    const match = timeString.match(minutesRegex);
    if (match) {
      minutes = parseInt(match[1]);
    }
  } else if (floatHoursRegex.test(timeString)) {
    const match = timeString.match(floatHoursRegex);
    if (match) {
      hours = parseFloat(match[1] + "." + match[2]);
    }
  } else if (hhmmRegex.test(timeString)) {
    const match = timeString.match(hhmmRegex);
    if (match) {
      hours = parseInt(match[1]);
      minutes = parseInt(match[2]);
    }
  } else {
    console.error(`Invalid time format: ${timeString}`);
    return -1;
  }

  return toSeconds(hours, minutes);
};

export const convertDateISOToSeconds = (dateISO: string) => {
  const date = new Date(dateISO);
  const seconds = Math.floor(date.getTime() / 1000);

  return seconds;
};
