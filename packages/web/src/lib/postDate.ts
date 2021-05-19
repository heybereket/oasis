export const postDate = (createdAt: string): string => {
  const date = new Date(Number(createdAt));

  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const time = `${hours}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}`;

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const ord = day === 1 && "st" || day === 2 && "nd" || day === 3 && "rd" || "th";
  const year = date.getFullYear();


  return `${time}${ampm} • ${month} ${day}${ord} ${year}`;
}
