import moment from 'moment'

export const convertToMonthDayYear = (unixTimestamp) => {
  if (unixTimestamp !== '0') {
    const date = new Date(unixTimestamp * 1000)
    return moment(date).format('hh:mm, MMMM DD, YYYY')
  }
  return unixTimestamp
}

const calculateRemainDate = (currentDate, dataDate) => {
  const m1 = moment(currentDate, 'DD-MM-YYYY HH:mm')
  const m2 = moment(dataDate, 'DD-MM-YYYY HH:mm')
  const m3 = m2.diff(m1, 'minutes')

  const numdays = Math.floor(m3 / 1440)
  const numhours = Math.floor((m3 % 1440) / 60)
  const numminutes = Math.floor((m3 % 1440) % 60)

  if (numdays === 0 && numhours === 0 && numminutes === 0) {
    return 0
  } else {
    return numdays + ' day(s) ' + numhours + ' hours ' + numminutes + ' minutes'
  }
}

export const remainDate = (unixTimestamp) => {
  const currentDate = new Date()
  const vetoDate = new Date(unixTimestamp * 1000)
  if (currentDate > vetoDate) {
    return 0
  } else {
    return calculateRemainDate(currentDate, vetoDate)
  }
}
export const remainDateTimeSince = (unixTimestamp) => {
  const currentDateUnixTimestamp = Math.floor(Date.now() / 1000)
  if (unixTimestamp > currentDateUnixTimestamp) {
    return 0
  } else {
    const dataDate = new Date(unixTimestamp * 1000)
    return calculateRemainDate(dataDate, new Date())
  }
}

export const dateToTimestamp = (value) => {
  return Math.floor(new Date(value).getTime() / 1000)
}

export const getNowTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000)
}

export const getNowTimeWithGMT = () => {
  const offset = new Date().getTimezoneOffset() / -60
  return moment().format('DD.MM.YYYY HH:mm') + ` GMT+${offset}`
}
