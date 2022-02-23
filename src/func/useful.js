import { ParameterType } from '@q-dev/q-js-sdk'
import { BigNumber } from 'bignumber.js'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { keyRegex } from 'constants/regex'
import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper'
import { orderBy } from 'lodash'

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
export const getMinimalActiveBlockHeight = async () => {
  const blocksDependsOnVersion = window.ethereum.networkVersion === '35442' ? 40000 : 300000
  const block = await window.web3.eth.getBlock('latest')
  return {
    minimalActiveBlockHeight: Math.max(0, Number(block.number) - Number(blocksDependsOnVersion)),
    lastBlockHeight: block.number
  }
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

export const sortAndCountProposalsByType = (proposals) => {
  const active = []
  const ended = []

  const proposalsCount = {
    active: 0,
    ended: 0
  }

  proposals.forEach((array) => {
    proposalsCount.active += array[0].length
    active.push(...array[0])
    proposalsCount.ended += array[1].length
    ended.push(...array[1])
  })

  return [proposalsCount, active, ended]
}

export const groupArrayByBlockNumber = (array) => {
  return orderBy(array, ['blockNumber'], ['desc', 'asc'])
}

export const fillArray = (length) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array[i] = i
  }
  return array
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

export const toNumber = (value) => Number(value.toString().replace(/[Q,%]/g, ''))

export const getPercentageFormat = (number) => {
  return BN('1e+25').multipliedBy(number).toFixed()
}

export const addIndex = (array) => {
  return array.map((item, idx) => ({ id: idx + 1, ...item }))
}

export const createShareText = (type, contract, id, user) => {
  const link = `${window.location.origin}`
  switch (type) {
    case 'proposal': {
      return link + `/q-governance/proposal/${contract}/${id}`
    }
    case 'auction': {
      const auctionPart = `/auction/${transformAuctionNameToAuctionType(contract)}/${id}`
      if (contract === CONTRACTS_NAMES.liquidationAuction) {
        return link + auctionPart + '+' + user
      } else {
        return link + auctionPart
      }
    }
  }
}

const stringRegex = /^[äöüa-zA-Z0-9]+$/gm
const booleanValues = ['true', 'false', 'True', 'False', 'TRUE', 'FALSE', '1', '0']
export const unitRegex = /^[1-9]+[0-9]*$/

export function validatePattern (value, type) {
  switch (type) {
    case ParameterType.ADDRESS: {
      return isAddress(value) ? true : 'Address not valid'
    }
    case ParameterType.BOOL: {
      return booleanValues.includes(value) ? true : 'Boolean not valid'
    }
    case ParameterType.STRING: {
      return value.match(stringRegex) && value.length <= 70 ? true : 'String not valid'
    }
    case ParameterType.UINT: {
      return value.match(unitRegex) && value.length <= 70 ? true : 'Unit not valid'
    }
  }
}

export function parameterKeyValidation (key) {
  return key.length <= 70 && key.match(keyRegex) ? true : 'Parameter key not valid'
}
