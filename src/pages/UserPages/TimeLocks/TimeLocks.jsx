import React, { useState, useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'

import AddressForm from './components/AddressForm'
import { InfoWrap } from './styles'
import BalanceCard from './components/BalanceCard'
import { fN } from 'func/useful'
import { getUserBalance, getMinimumQVaultTimeLock, getQVaultTimeLocks } from 'store/actions/action-creaters/q-vault'

import {
  getRootNodeStakes,
  getMinimumRootTimeLock,
  getRootTimeLocks
} from 'store/actions/action-creaters/root-contract'

import {
  getSelfStake,
  getMinimumValidatorsTimeLock,
  getValidatorsTimeLocks
} from 'store/actions/action-creaters/validators'

import {
  getVestingBalance,
  getMinimumVestingTimeLock,
  getVestingTimeLocks
} from 'store/actions/action-creaters/vesting'

import { userBalance, qVaultMinimumTimeLock, qVaultTimeLocks } from 'store/selectors/q-vault'
import { rootNodeStake, rootMinimumTimeLock, rootTimeLocks } from 'store/selectors/root-contract'
import { selfStake, validatorsMinimumTimeLock, validatorsTimeLocks } from 'store/selectors/validators'
import { vestingBalance, vestingMinimumTimeLock, vestingTimeLocks } from 'store/selectors/vesting'

function TimeLocks () {
  const dispatch = useDispatch()

  const userAddress = useSelector(userAddressMetamask)

  const [currentAddress, setCurrentAddress] = useState({ address: userAddress })

  const qVaultStakeBalance = useSelector(userBalance)
  const qVaultTimeLockMinimumBalance = useSelector(qVaultMinimumTimeLock)
  const qVaultTimeLocksArray = useSelector(qVaultTimeLocks)

  const rootStakeBalance = useSelector(rootNodeStake)
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock)
  const rootTimeLocksArray = useSelector(rootTimeLocks)

  const validatorSelfStake = useSelector(selfStake)
  const validatorsTimeLockMinimumBalance = useSelector(validatorsMinimumTimeLock)
  const validatorsTimeLocksArray = useSelector(validatorsTimeLocks)

  const vestingStakeBalance = useSelector(vestingBalance)
  const vestingTimeLockMinimumBalance = useSelector(vestingMinimumTimeLock)
  const vestingTimeLocksArray = useSelector(vestingTimeLocks)

  useEffect(() => {
    dispatch(getUserBalance(currentAddress.address))
    dispatch(getMinimumQVaultTimeLock(currentAddress.address))
    dispatch(getQVaultTimeLocks(currentAddress.address))

    dispatch(getRootNodeStakes(currentAddress.address))
    dispatch(getMinimumRootTimeLock(currentAddress.address))
    dispatch(getRootTimeLocks(currentAddress.address))

    dispatch(getSelfStake(currentAddress.address))
    dispatch(getMinimumValidatorsTimeLock(currentAddress.address))
    dispatch(getValidatorsTimeLocks(currentAddress.address))

    dispatch(getVestingBalance(currentAddress.address))
    dispatch(getMinimumVestingTimeLock(currentAddress.address))
    dispatch(getVestingTimeLocks(currentAddress.address))
  }, [dispatch, currentAddress])

  const handleRefresh = (userAddress) => {
    setCurrentAddress(userAddress)
  }
  const cardsData = [
    {
      contract: 'qVault',
      timeLockBalance: fN(qVaultTimeLockMinimumBalance),
      balance: fN(qVaultStakeBalance),
      lockAmountData: qVaultTimeLocksArray || [],
      modalTitle: 'Deposit & purge',
      title: 'Q Vault Account Balance'
    },
    {
      contract: 'root',
      timeLockBalance: fN(rootTimeLockMinimumBalance),
      balance: fN(rootStakeBalance),
      lockAmountData: rootTimeLocksArray || [],
      modalTitle: 'Deposit & purge',
      title: 'Root Stake Balance'
    },
    {
      contract: 'validators',
      timeLockBalance: fN(validatorsTimeLockMinimumBalance),
      balance: fN(validatorSelfStake),
      lockAmountData: validatorsTimeLocksArray || [],
      modalTitle: 'Deposit & Purge',
      title: 'Validator Stake Balance'
    },
    {
      contract: 'vesting',
      timeLockBalance: fN(vestingTimeLockMinimumBalance),
      balance: fN(vestingStakeBalance),
      lockAmountData: vestingTimeLocksArray || [],
      modalTitle: 'Deposit, Withdraw & Purge',
      title: 'Vesting Account Balance'
    }
  ]

  return (
        <PageWrap headerTitle="Time Locks">
            <InfoWrap>
                <AddressForm setAddressRefresh={handleRefresh} userAddress={currentAddress} />
                {cardsData.map((card) => (
                    <BalanceCard
                        key={card.contract}
                        address={currentAddress.address}
                        timeLockBalance={card.timeLockBalance}
                        balance={card.balance}
                        contract={card.contract}
                        modalTitle={card.modalTitle}
                        title={card.title}
                        lockAmountData={card.lockAmountData}
                    />
                ))}
            </InfoWrap>
        </PageWrap>
  )
}

export default TimeLocks
