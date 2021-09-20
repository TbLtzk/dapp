import { setTransactionLoading } from 'store/actions/action-creaters/transaction-handler'

import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress, StableCoinQUSD } from 'contracts/src/StableCoin'
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore'

import { uintPerSecondToPerYearNumber } from 'func/useful'
import { fromBtcBlockchain, toBtcBlockchain, toWei, fromWei } from 'func/balance'
import { MAX_APPROVE_AMOUNT, UINT_PSEUDO_UNDEFINED } from 'constants/numbers'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'

export default class Handler {
  constructor (address, collateralKey, dispatch, vaultId) {
    this.address = address
    this.borrowingContract = new BorrowingCoreQUSD(contractsToAddresses.BorrowingCoreQUSD)
    this.dispatch = dispatch
    this.vaultId = String(vaultId)

    if (collateralKey === 'QETH') {
      // collateral contract
      this.stableCoinContract = new GovernedEpdrQethAddress()
    } else if (collateralKey === 'QBTC') {
      // collateral contract
      this.stableCoinContract = new GovernedEpdrQbtcAddress()
    }

    this.stableCoinUSDContract = new StableCoinQUSD()
  }

  async setVaultStats (setCollateralInf, setBorrowingInf, setLoadingInf) {
    setLoadingInf(true)
    let availableDeposit = await this.setAvailableToDeposit()
    let availableRepay = await this.setAvailableToRepay()
    this.borrowingContract.getVaultStats(this.address, this.vaultId)
      .then((res) => {
        const colAsset = res?.colStats?.key
        const stcConversion = fromWei
        const colConversion = colAsset === 'QBTC' ? fromBtcBlockchain : fromWei

        const lockedCol = colConversion(res?.colStats?.balance || 0)

        const colPrice = res?.colStats?.price ? stcConversion(res.colStats.price) : 0

        const borOutstandingDebt = res?.stcStats?.outstandingDebt ? stcConversion(res.stcStats.outstandingDebt) : 0
        const borrowingLimit = res?.stcStats?.borrowingLimit ? stcConversion(res.stcStats.borrowingLimit) : 0

        const availableWithdraw = res?.colStats?.withdrawableAmount ? colConversion(res.colStats.withdrawableAmount) : 0
        const availableBorrow = res?.stcStats?.availableToBorrow ? stcConversion(res.stcStats.availableToBorrow) : 0

        availableDeposit = !availableDeposit ? 0 : colConversion(availableDeposit)

        const liquidationPriceRaw = res?.colStats?.liquidationPrice
        let liquidationPrice = 0
        if (liquidationPriceRaw && liquidationPriceRaw !== UINT_PSEUDO_UNDEFINED) {
          liquidationPrice = stcConversion(liquidationPriceRaw)
        }

        const collateralDetails = {
          assets: colAsset,
          lockedCol: lockedCol,
          assetPrice: colPrice,
          availableWithdraw: availableWithdraw,
          availableDeposit: availableDeposit,
          liquidationPrice
        }

        const borCollateralValue = lockedCol * colPrice
        availableRepay = !availableRepay ? 0 : stcConversion(availableRepay)

        const borrowingDetails = {
          assets: res?.stcStats?.key,
          collateralValue: borCollateralValue,
          borrowingLimit: borrowingLimit,
          availableBorrow: availableBorrow,
          availableRepay: availableRepay,
          outstandingDebt: borOutstandingDebt,
          liquidationLimit: res?.stcStats?.liquidationLimit ? stcConversion(res.stcStats.liquidationLimit) : 0,
          borrowingFee: res?.stcStats?.borrowingFee ? uintPerSecondToPerYearNumber(res.stcStats.borrowingFee) : 0
        }

        setCollateralInf(collateralDetails)
        setBorrowingInf(borrowingDetails)
        setLoadingInf(false)
      })
      .catch((e) => {
        setCollateralInf({})
        setBorrowingInf({})
        setLoadingInf(false)
        console.error(e)
      })
      .finally(() => {
      })
  }

  async setAvailableToDeposit () {
    return await this.stableCoinContract?.balanceOf(this.address)
  }

  async addDeposit (amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionLoading())

    this.borrowingContract.depositCol(this.address, vaultNum, toBtcBlockchain(amount))
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionLoading())
      })
  }

  async withdraw (amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionLoading())

    this.borrowingContract.withdrawCol(this.address, vaultNum, toBtcBlockchain(amount))
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionLoading())
      })
  }

  async borrow (amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionLoading())

    this.borrowingContract.generateStc(this.address, vaultNum,
      toWei(amount)
    )
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionLoading())
      })
  }

  async repay (amount, vaultNum, setCollateralInf, setBorrowingInf, setLoadingInf) {
    this.dispatch(setTransactionLoading())
    const valueAmount = toWei(amount)
    this.borrowingContract.payBackStc(this.address, vaultNum, valueAmount)
      .then(() => {
        this.setVaultStats(setCollateralInf, setBorrowingInf, setLoadingInf)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        this.dispatch(setTransactionLoading())
      })
  }

  async approve (contract) {
    await contract.approve(this.borrowingContract.address, MAX_APPROVE_AMOUNT, this.address)
  }

  async approveSwitcher (type) {
    if (type === 'deposit') {
      await this.approve(this.stableCoinContract)
    } else if (type === 'repay') {
      await this.approve(this.stableCoinUSDContract)
    }
  }

  allowance (contract, stateSetter) {
    contract.allowance(this.address, this.borrowingContract.address)
      .then((res) => {
        stateSetter(res)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  allowanceSwitcher (stateSetter, type) {
    if (type === 'deposit') {
      this.allowance(this.stableCoinContract, stateSetter)
    } else if (type === 'repay') {
      this.allowance(this.stableCoinUSDContract, stateSetter)
    }
  }

  async setAvailableToRepay () {
    return await this.stableCoinUSDContract.balanceOf(this.address)
  }
}
