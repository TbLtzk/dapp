function parseDate(solTimestamp) {
    let date = new Date(solTimestamp * 1000);

    return {
        dateNum: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: ('0' + (date.getHours() + new Date().getTimezoneOffset() / 60 )).slice(-2),
        minute: ('0' + date.getMinutes()).slice(-2),
    }
}

export function fromSolDateFormattingT1(solTimestamp) {
    if (0 === Number(solTimestamp)) return '0';

    let data = parseDate(solTimestamp);

    return `${data.dateNum}.${data.month}.${data.year} ${data.hours}:${data.minute}`
}

export function fromMillisecondToSec(millisecond) {
    return Math.floor(millisecond / 1000);
}
