import { BigNumber } from 'bignumber.js'

export const errorHandler = (error, field, min = 0, max = 100) => {
  if (undefined === error[field]) return ''

  switch (error[field].type) {
    case 'required':
      return 'Field is required!'
    case 'min':
      return `Value must be more than ${min}`
    case 'max':
      return `Value must be less than ${max}`
    default:
      return 'Validation error!'
  }
}

export const fN = (number) => {
  const maximumFractionDigits = 4
  const truncated = BN(number).toFixed(maximumFractionDigits, BigNumber.ROUND_DOWN)
  if (number === undefined || number.isNaN) return number
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(truncated)
}

export const uintPercentToNumber = (num) => {
  if (num === undefined || num.isNaN === true) return undefined
  if (num <= 0) return 0
  if (num >= 10 ** 27) return 100

  return num / 10 ** 27
}

export const uintPerSecondToPerYearNumber = (num) => {
  const numL = num

  if (numL === undefined || numL.isNaN === true) return undefined

  const perSec = uintPercentToNumber(numL)
  return ((1 + perSec) ** (365 * 24 * 3600) - 1) * 100
}

export function BN (value) {
  return new BigNumber(value)
}

export const getPercentageFormat = (number) => {
  return BN('1e+25').multipliedBy(number).toFixed()
}

export const errorWrapper = async (method) => {
  return await promisify((get) =>
    method.on('confirmation', (confNumber, receipt, latestBlockHash) => get(receipt)).on('error', (error) => get(error))
  )
}

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((res) => {
      if (res.status === true) {
        resolve(res)
        return
      }
      reject(res)
      throw new Error()
    })
  )
