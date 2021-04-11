function daysBetween(StartDate, EndDate) {
  const oneDay = 1000 * 60 * 60 * 24;

  const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
  const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());

  return (start - end) / oneDay;
}

export default function formatJoinedDateText(joinedDate) {
  var dayDiff = daysBetween(joinedDate, new Date());
  if (dayDiff == 0) return `Joined today!`;
  if (dayDiff == 1) return `Joined yesterday!`;
  if (dayDiff <= 29) return `Joined ${dayDiff} days ago!`;

  var monthDiff = Math.round(dayDiff / 30);
  return `Joined ${monthDiff > 1 ? `${monthDiff} months` : `a month`} ago!`;
}
