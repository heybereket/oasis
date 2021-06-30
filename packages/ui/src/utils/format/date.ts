import dayjs from 'dayjs';

export const MS = 1; // 1
export const SECOND = 1000 * MS; // 1000
export const MINUTE = 60 * SECOND; // 60000
export const HOUR = 60 * MINUTE; // 3600000
export const DAY = 24 * HOUR; // 86400000
export const MONTH = 30 * DAY; // 2592000000
export const YEAR = 365 * DAY; // 31536000000

const AS_JUST_NOW = 5 * SECOND;
const AS_SECONDS = 45 * SECOND;
const AS_A_MINUTE = 90 * SECOND;
const AS_MINUTES = 45 * MINUTE;
const AS_AN_HOUR = 90 * MINUTE;
const AS_HOURS = 22 * HOUR;
const AS_A_DAY = 36 * HOUR;
const AS_DAYS = 26 * DAY;
const AS_A_MONTH = 45 * DAY;
const AS_MONTHS = 320 * DAY;
const AS_A_YEAR = 548 * DAY;

export const invalidDate = 'Invalid Date';

export const formatDate = (createdAt: number | string | Date): string => {
  const date = new Date(Number(createdAt));
  if (isNaN(date.getTime())) return invalidDate;
  const now = Date.now();
  const diff = now - date.getTime();
  let time;

  if (typeof window !== 'undefined') {
    time = dayjs(Number(createdAt)).format('h:mm A');
  }

  if (diff < 0) return invalidDate;
  if (diff < AS_JUST_NOW) return `${time} • just now`;
  if (diff < AS_SECONDS) return `${time} • a few seconds ago`;
  if (diff < AS_A_MINUTE) return `${time} • 1m ago`;
  if (diff < AS_MINUTES) return `${time} • ${Math.round(diff / MINUTE)}m ago`;
  if (diff < AS_AN_HOUR) return `${time} • 1h ago`;
  if (diff < AS_HOURS) return `${time} • ${Math.round(diff / HOUR)}h ago`;
  if (diff < AS_A_DAY) return `${time} • 1d ago`;
  if (diff < AS_DAYS) return `${time} • ${Math.round(diff / DAY)}d ago`;
  if (diff < AS_A_MONTH) return `${time} • 1mo ago`;
  if (diff < AS_MONTHS) return `${time} • ${Math.round(diff / MONTH)}mo ago`;
  if (diff < AS_A_YEAR) return `${time} • 1yr ago`;

  return `${time} • ${Math.round(diff / YEAR)}yrs ago`;
};
