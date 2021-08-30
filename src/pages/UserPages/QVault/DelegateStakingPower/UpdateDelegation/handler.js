// eslint-disable-next-line max-classes-per-file
import { toWei } from 'func/balance'

export class ComponentHandler {
  constructor (alert) {
    this.alert = alert
  }

  getAddressesAndShares (applyZeroShare, userBalance) {
    const inputAddresses = []
    const invalidAddressesKey = []
    const inputShares = []
    const invalidSharesKey = []
    const inputContainers = document.querySelectorAll('.input_container .input_container_item')

    // Get all values from input containers
    inputContainers.forEach((element) => {
      inputAddresses.push(element.querySelector('.input_address input').value)
      if (applyZeroShare) {
        inputShares.push('0')
        element.querySelector('.input_share input').value = '0'
      } else {
        inputShares.push(element.querySelector('.input_share input').value)
      }
    })

    // Validate addresses
    inputAddresses.forEach((element, key) => {
      if (element.match(/^(0x)?[0-9a-fA-F]{40}$/i)) return
      invalidAddressesKey.push(key)
    })

    // Validate shares
    let shareSum = 0
    inputShares.forEach((element, key) => {
      const elementL = Number(element)

      if (applyZeroShare === true && (element.isNaN || element < 0)) {
        invalidSharesKey.push(key)
      } else if (applyZeroShare === false && (element.isNaN || element <= 0)) {
        invalidSharesKey.push(key)
      }

      shareSum += elementL

      if (typeof elementL === 'number') {
        inputShares[key] = toWei(elementL)
      } else {
        inputShares[key] = 0
      }
    })

    if (shareSum > userBalance) {
      this.alert.error('Shared sum should be less then QV balance!')
      invalidSharesKey.push(inputShares.length - 1)
    }

    // Setup or remove error messages
    inputContainers.forEach((element, key) => {
      const errorAddressCont = element.querySelector('.input_address p')
      const errorShareCont = element.querySelector('.input_share p')

      if (invalidAddressesKey.includes(key)) {
        errorAddressCont.innerHTML = 'Mistake in the address'
      } else {
        errorAddressCont.innerHTML = ''
      }

      if (invalidSharesKey.includes(key)) {
        errorShareCont.innerHTML = 'Wrong amount'
      } else {
        errorShareCont.innerHTML = ''
      }
    })

    if (invalidAddressesKey.length === 0 && invalidSharesKey.length === 0) {
      return {
        addresses: inputAddresses,
        shares: inputShares
      }
    }
    return {
      addresses: [],
      shares: []
    }
  }
}
