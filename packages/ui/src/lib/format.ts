import { abbreviateNumber } from './abbreviate';

export const formatNumber = (num: number) => {
  if (num < 0) {
    return `-${abbreviateNumber(-1 * num)}`;
  } else {
    return abbreviateNumber(num);
  }
};

export const formatDate = (createdAt: string): string => {
  const date = new Date(Number(createdAt));

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const ord =
    (day === 1 && 'st') || (day === 2 && 'nd') || (day === 3 && 'rd') || 'th';
  const year = date.getFullYear();

  return `${time} • ${month} ${day}${ord} ${year}`;
};

