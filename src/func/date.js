function parseDate(solTimestamp) {
  const date = new Date(solTimestamp * 1000);

  return {
    dateNum: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    month: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    year: date.getFullYear(),
    hours: (`0${date.getHours()}`).slice(-2),
    minute: (`0${date.getMinutes()}`).slice(-2),
  };
}

export function fromSolDateFormattingT1(solTimestamp) {
  if (Number(solTimestamp) === 0) return '0';

  const data = parseDate(solTimestamp);
  const offset = new Date().getTimezoneOffset() / 60;
  // eslint-disable-next-line max-len
  return `${data.dateNum}.${data.month}.${data.year} ${data.hours}:${data.minute} GMT${offset < 0 ? '+' : '-'}${offset < 0 ? offset * -1 : offset}:00`;
}
