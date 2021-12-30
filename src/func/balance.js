import { BN } from './useful'

export function fromBtcBlockchain (value) {
  return BN(value).dividedBy(1e8).toFixed()
}

export function toBtcBlockchain (value) {
  return BN(value).multipliedBy(1e8).toFixed()
}

export function percentageToPercentPerSecond (number) {
  if (number) {
    const first = number / 100
    const second = (1 + first) ** (1 / (3600 * 24 * 365)) - 1
    const third = BN(String(second * 10 ** 27))
    return third.toFixed()
  } else {
    return '0'
  }
}

export function toWei (value) {
  const amount = BN(value)
  const a = BN(10 ** 18)
  return amount.multipliedBy(a).toFixed()
}

export function fromWei (value) {
  if (isNaN(Number(value))) {
    return 0
  } else {
    const amount = BN(value)
    const a = BN(10 ** 18)
    return amount.dividedBy(a).toFixed()
  }
}

export function calculateGas (data) {
  return Number(window.web3.utils.fromWei(String(data * 50), 'gwei')).toFixed(6)
}

export function subtractAmount (value = 0, value2 = 0) {
  const result = BN(toWei(value)).minus(toWei(value2)).toFixed()
  return fromWei(result)
}
