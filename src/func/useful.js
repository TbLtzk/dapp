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

export const removeCurrentProposals = (arr1, arr2, removeCurrProp) => {
  if (removeCurrProp) {
    return arr2
  } else {
    return [...arr1, ...arr2]
  }
}

export const sortByVotingEndTime = (array) => {
  return [...array].flat().sort((a, b) => Number(b.votingEndTime - Number(a.votingEndTime)))
}

export const getUniqueProposals = (array) => {
  return array.filter(
    (elem, index, self) => self.findIndex((t) => t.id === elem.id && t.contract === elem.contract) === index
  )
}

export const fN = (number) => {
  if (number === undefined || isNaN(number) || number === null) return 0
  const maximumFractionDigits = 4
  const truncated = BN(number).toFixed(maximumFractionDigits, BigNumber.ROUND_DOWN)
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits }).format(truncated)
}

export const uintPercentToNumber = (num) => {
  if (num === undefined || num.isNaN === true) return undefined
  if (num <= 0) return 0
  if (num >= 10 ** 27) return 100

  return num / 10 ** 27
}

export const isAddress = (address) => {
  return window.web3.utils.isAddress(address)
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

export const addIndex = (array) => {
  return array.map((item, idx) => ({ id: idx + 1, ...item }))
}
