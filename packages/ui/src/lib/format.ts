import moment from 'moment';

// Abbreviate Number
export const abbreviateNumber = (num: number) => {
  if (num < 1e3) return num;
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + 'K';
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + 'M';
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + 'B';
  if (num >= 1e12) return +(num / 1e12).toFixed(1) + 'T';
  return num;
};

// Format Number
export const formatNumber = (num: number) => {
  if (num < 0) {
    return `-${abbreviateNumber(-1 * num)}`;
  } else {
    return abbreviateNumber(num);
  }
};

// Format Date
export const formatDate = (createdAt: string): string => {
  const day = moment(Number(createdAt)).fromNow();
  const time = moment(Number(createdAt)).locale('en').format('h:mm A');

  return `${time} • ${day}`;
};
