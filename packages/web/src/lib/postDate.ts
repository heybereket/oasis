export const postDate = (createdAt: string): string => {
  const date = new Date(Number(createdAt));

  const hours = `${date.getHours()}:${date.getMinutes()}`;
  const AMPM = 24 >= 12 ? "PM" : "AM";
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDay();
  const ord = day === 1 && "st" || day === 2 && "nd" || day === 3 && "rd" || "th";
  const year = date.getFullYear();

  return `${hours}${AMPM} • ${month} ${day}${ord} ${year}`;
}