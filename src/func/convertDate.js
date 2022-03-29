import moment from 'moment'

export const convertToMonthDayYear = (unixTimestamp) => {
  if (unixTimestamp !== '0') {
    const date = new Date(unixTimestamp * 1000)
    return moment(date).format('hh:mm, MMMM DD, YYYY A')
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

  if (!numdays && !numhours && !numminutes) {
    return 0
  } else {
    return numdays + ' day(s) ' + numhours + ' hours ' + numminutes + ' minutes'
  }
}

export const remainDate = (unixTimestamp) => {
  const timestampInMs = Number(unixTimestamp) * 1000
  const currentDate = new Date()
  const vetoDate = new Date(timestampInMs)
  if (currentDate > vetoDate) {
    return 0
  } else {
    return calculateRemainDate(currentDate, vetoDate)
  }
}
export const remainDateTimeSince = (unixTimestamp) => {
  unixTimestamp = Number(unixTimestamp)
  const currentDateUnixTimestamp = Math.floor(Date.now() / 1000)
  if (unixTimestamp > currentDateUnixTimestamp) {
    return 0
  } else {
    if (!unixTimestamp) {
      return 0
    } else {
      const dataDate = new Date(unixTimestamp * 1000)
      return calculateRemainDate(dataDate, new Date())
    }
  }
}

export const dateToTimestamp = (value) => {
  return Math.floor(new Date(Number(value)).getTime() / 1000).toString()
}

export const getNowTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000).toString()
}

export const getNowTimeWithGMT = (format) => {
  const offset = new Date().getTimezoneOffset() / -60
  return moment().format(format) + ` GMT+${offset}`
}
