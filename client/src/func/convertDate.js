import moment from 'moment';

export const convertToMonthDayYear = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return moment(date).format('hh:mm, MMMM DD, YYYY');
};

export const remainDate = (unixTimestamp) => {
    //TODO: change places vetoDate and currentDate
    const vetoDate = new Date();
    const currentDate = new Date(unixTimestamp * 1000);
    if (currentDate > vetoDate) {
        return 0
    } else {
        const m1 = moment(currentDate, 'DD-MM-YYYY HH:mm');
        const m2 = moment(vetoDate, 'DD-MM-YYYY HH:mm');
        const m3 = m2.diff(m1, 'minutes');

        const numdays = Math.floor(m3 / 1440);
        const numhours = Math.floor((m3 % 1440) / 60);
        const numminutes = Math.floor((m3 % 1440) % 60);
        return numdays + " day(s) " + numhours + " hours " + numminutes + " minutes";
    }
};
