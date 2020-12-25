import moment from 'moment';

export const convertToMonthDayYear = (unixTimestamp) => {
    if (unixTimestamp !== "0") {
        const date = new Date(unixTimestamp * 1000);
        // console.log("date", date);
        const dateToLocaleString = date.toLocaleString();
        // console.log("unixTimestamp", unixTimestamp);
        // console.log("toLocaleString", dateToLocaleString);
        // console.log("moment.locale();", moment.locale());
        return moment(date).format('hh:mm, MMMM DD, YYYY');
    }
    return unixTimestamp;
};

export const remainDate = (unixTimestamp) => {
    const currentDate = new Date();
    const vetoDate = new Date(unixTimestamp * 1000);
    if (currentDate > vetoDate) {
        return 0
    } else {
        const m1 = moment(currentDate, 'DD-MM-YYYY HH:mm');
        const m2 = moment(vetoDate, 'DD-MM-YYYY HH:mm');
        const m3 = m2.diff(m1, 'minutes');

        const numdays = Math.floor(m3 / 1440);
        const numhours = Math.floor((m3 % 1440) / 60);
        const numminutes = Math.floor((m3 % 1440) % 60);

        if (numdays === 0 && numhours === 0 && numminutes === 0){
            return 0
        }else {
            return numdays + " day(s) " + numhours + " hours " + numminutes + " minutes";
        }
    }
};
