import React, { useState, useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'

import AddressForm from './components/AddressForm'
import { InfoWrap } from './styles'
import BalanceCard from './components/BalanceCard'
import { fN } from 'func/useful'
import { getUserBalance, getMinimumQVaultTimeLock, getQVaultTimeLocks } from 'store/actions/action-creaters/q-vault'

// root
import {
  getRootNodeStakes,
  getMinimumRootTimeLock,
  getRootTimeLocks
} from 'store/actions/action-creaters/root-contract'

// validators
import {
  getSelfStake,
  getMinimumValidatorsTimeLock,
  getValidatorsTimeLocks
} from 'store/actions/action-creaters/validators'

// vesting
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
  // qvault
  const qVaultStakeBalance = useSelector(userBalance)
  const qVaultTimeLockMinimumBalance = useSelector(qVaultMinimumTimeLock)
  const qVaultTimeLocksArray = useSelector(qVaultTimeLocks)
  // root
  const rootStakeBalance = useSelector(rootNodeStake)
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock)
  const rootTimeLocksArray = useSelector(rootTimeLocks)

  // validators
  const validatorSelfStake = useSelector(selfStake)
  const validatorsTimeLockMinimumBalance = useSelector(validatorsMinimumTimeLock)
  const validatorsTimeLocksArray = useSelector(validatorsTimeLocks)
  // vesting
  const vestingStakeBalance = useSelector(vestingBalance)
  const vestingTimeLockMinimumBalance = useSelector(vestingMinimumTimeLock)
  const vestingTimeLocksArray = useSelector(vestingTimeLocks)

  useEffect(() => {
    // qvault
    dispatch(getUserBalance(currentAddress.address))
    dispatch(getMinimumQVaultTimeLock(currentAddress.address))
    dispatch(getQVaultTimeLocks(currentAddress.address))
    // root
    dispatch(getRootNodeStakes('', currentAddress.address))
    dispatch(getMinimumRootTimeLock(currentAddress.address))
    dispatch(getRootTimeLocks(currentAddress.address))
    // validators
    dispatch(getSelfStake(currentAddress.address))
    dispatch(getMinimumValidatorsTimeLock(currentAddress.address))
    dispatch(getValidatorsTimeLocks(currentAddress.address))
    // vesting
    dispatch(getVestingBalance(currentAddress.address))
    dispatch(getMinimumVestingTimeLock(currentAddress.address))
    dispatch(getVestingTimeLocks(currentAddress.address))
  }, [dispatch, currentAddress])

  const handleRefresh = (userAddress) => {
    setCurrentAddress(userAddress)
  }

  return (
        <PageWrap headerTitle="Time Locks">
            <AddressForm setAddressRefresh={handleRefresh} userAddress={currentAddress} />
            <InfoWrap>
                <BalanceCard
                    address={currentAddress.address}
                    timeLockBalance={fN(qVaultTimeLockMinimumBalance)}
                    balance={fN(qVaultStakeBalance)}
                    contract="qVault"
                    modalTitle="Deposit & purge"
                    title="Q Vault account balance"
                    lockAmountData={qVaultTimeLocksArray || []}
                />
                <BalanceCard
                    address={currentAddress.address}
                    timeLockBalance={fN(rootTimeLockMinimumBalance)}
                    balance={fN(rootStakeBalance)}
                    contract="root"
                    modalTitle="Deposit & purge"
                    title="Root stake balance"
                    lockAmountData={rootTimeLocksArray || []}
                />
                <BalanceCard
                    address={currentAddress.address}
                    timeLockBalance={fN(validatorsTimeLockMinimumBalance)}
                    balance={fN(validatorSelfStake)}
                    contract="validators"
                    modalTitle="Deposit & purge"
                    title="Validator stake balance"
                    lockAmountData={validatorsTimeLocksArray || []}
                />
                <BalanceCard
                    address={currentAddress.address}
                    timeLockBalance={fN(vestingTimeLockMinimumBalance)}
                    balance={fN(vestingStakeBalance)}
                    contract="vesting"
                    modalTitle="Deposit, withdraw & purge"
                    title="Vesting account balance"
                    lockAmountData={vestingTimeLocksArray || []}
                />
            </InfoWrap>
        </PageWrap>
  )
}

export default TimeLocks
