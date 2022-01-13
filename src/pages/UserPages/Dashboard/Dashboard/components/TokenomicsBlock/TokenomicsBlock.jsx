import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rewardPoolsBalanceSelector } from 'store/validation-reward-pools/selectors'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { qvBalance, updateCompoundRate } from 'store/q-vault/selectors'
import { getQVBalance, getUpdateCompoundRate } from 'store/q-vault/action-creators'

import Handler from './handler'

import CustomBlock from 'components/Base/CustomBlock'
import CardBlock from 'components/Base/CardBlock'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { remainDateTimeSince } from 'func/convertDate'
import { fN, uintPerSecondToPerYearNumber } from 'func/useful'
import { setErrorMessage } from 'store/transaction-handler/action-creators'
import { reserveBalanceSelector } from 'store/system-reserve/selectors'
import { getSystemReserveBalance } from 'store/system-reserve/action-creators'
import { getRewardPoolsBalance } from 'store/validation-reward-pools/action-creators'

const BTN_TYPES = {
  defaultAllocation: 'default-allocation',
  validationRewardAllocation: 'validation-reward-allocation',
  rootNodeAllocation: 'root-node-allocation',
  timeSinceHolder: 'time-since-q-holder'
}

function TokenomicsBlock () {
  const dispatch = useDispatch()
  const userAddress = useSelector(userAddressMetamask)
  const isUpdateCompoundRate = useSelector(updateCompoundRate)
  const balanceDetails = useSelector(qvBalance)
  const reserveBalance = useSelector(reserveBalanceSelector)
  const rewardPoolsBalance = useSelector(rewardPoolsBalanceSelector)

  const [defaultAllocationProxy, setDefaultAllocationProxy] = useState('...')
  const [loadingDefaultAllocation, setLoadingDefaultAllocation] = useState(false)

  const [rootNodeRewardProxy, setRootNodeRewardProxy] = useState('...')
  const [loadingRootNodeReward, setLoadingRootNodeReward] = useState(false)

  const [validationRewardProxy, setValidationRewardProxy] = useState('...')
  const [loadingValidationReward, setLoadingValidationReward] = useState(false)

  const [timeSinceQHolderRewardUpdate, setTimeSinceQHolderRewardUpdate] = useState('...')
  const [timeSinceUnixTimestamp, setTimeSinceUnixTimestamp] = useState('...')

  const handler = new Handler(userAddress, dispatch, setErrorMessage)

  useEffect(() => {
    dispatch(getQVBalance())
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false)
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false)
  }, [defaultAllocationProxy])

  useEffect(() => {
    if (!isUpdateCompoundRate) {
      handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp)
    }
  }, [isUpdateCompoundRate])

  useEffect(() => {
    dispatch(getQVBalance())
    dispatch(getSystemReserveBalance())
    dispatch(getRewardPoolsBalance())
    handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp)
    handler.getDefaultAllocationProxy(setDefaultAllocationProxy, () => {}, false)
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false)
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceQHolderRewardUpdate(remainDateTimeSince(timeSinceUnixTimestamp))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [timeSinceUnixTimestamp])

  const onAllocate = useCallback((type) => {
    switch (type) {
      case BTN_TYPES.defaultAllocation:
        handler.getDefaultAllocationProxy(setDefaultAllocationProxy, setLoadingDefaultAllocation, true)
        break
      case BTN_TYPES.validationRewardAllocation:
        handler.getValidationRewardProxy(setValidationRewardProxy, setLoadingRootNodeReward, true)
        break
      case BTN_TYPES.rootNodeAllocation:
        handler.getRootNodeRewardProxy(setRootNodeRewardProxy, setLoadingValidationReward, true)
        break
    }
  }, [])

  const onRefresh = () => {
    dispatch(getUpdateCompoundRate(userAddress))
  }

  const getIsLoading = (type) => {
    switch (type) {
      case BTN_TYPES.defaultAllocation:
        return loadingDefaultAllocation
      case BTN_TYPES.validationRewardAllocation:
        return loadingRootNodeReward
      case BTN_TYPES.rootNodeAllocation:
        return loadingValidationReward
      case BTN_TYPES.timeSinceHolder:
        return isUpdateCompoundRate
      default:
        return false
    }
  }

  const dataArr = useMemo(() => {
    return [
      {
        title: 'Default Allocation Proxy',
        firstContent: defaultAllocationProxy + ' Q',
        btnTitle: 'Allocate',
        btnType: BTN_TYPES.defaultAllocation,
        btnIcon: 'cube-outline'
      },
      {
        title: 'Validation Reward Proxy',
        firstContent: validationRewardProxy + ' Q',
        btnTitle: 'Allocate',
        btnIcon: 'cube-outline',
        btnType: BTN_TYPES.validationRewardAllocation
      },
      {
        title: 'Root Node Reward Proxy',
        firstContent: rootNodeRewardProxy + ' Q',
        btnTitle: 'Allocate',
        btnIcon: 'cube-outline',
        btnType: BTN_TYPES.rootNodeAllocation,
        brakeLine: true
      },
      {
        title: 'Q Token Holder Reward Pool',
        firstContent: fN(balanceDetails.qHolderRewardPool) + ' Q',
        btnTitle: null
      },
      {
        title: 'Q Token Holder Reward Rate (p.a.)',
        firstContent: fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate)) + ' %',
        btnTitle: null
      },
      {
        title: 'Time since Q Token holder reward update',
        firstContent: timeSinceQHolderRewardUpdate,
        btnIcon: 'cached',
        iconFontSize: '20px',
        btnType: BTN_TYPES.timeSinceHolder,
        brakeLine: true
      },
      {
        title: 'Q System Reserve',
        firstContent: reserveBalance + ' Q',
        btnTitle: null
      },
      {
        title: 'Validation Reward Pools',
        firstContent: rewardPoolsBalance + ' Q',
        btnTitle: null
      }
    ]
  }, [
    defaultAllocationProxy,
    rootNodeRewardProxy,
    validationRewardProxy,
    timeSinceQHolderRewardUpdate,
    balanceDetails,
    reserveBalance,
    rewardPoolsBalance
  ])

  return (
        <CustomBlock>
            <h1>Tokenomics</h1>
            {dataArr.map((el) => (
                <Fragment key={el.title.replace(' ', '-')}>
                    <CardBlock
                        btnDisabled={getIsLoading(el.btnType)}
                        title={el.title}
                        firstContent={el.firstContent}
                        btnIcon={getIsLoading(el.btnType) ? null : el.btnIcon}
                        iconFontSize={el.iconFontSize}
                        btnTitle={getIsLoading(el.btnType) ? <LoadingSpinner /> : el.btnTitle}
                        btnHandler={
                            !el.btnTitle && !el.btnIcon
                              ? null
                              : () => {
                                  if (el.btnTitle === 'Allocate') {
                                    onAllocate(el.btnType)
                                  } else if (el.btnTitle === 'Refresh' || el.btnIcon === 'cached') {
                                    onRefresh()
                                  }
                                }
                        }
                    />
                    {el.brakeLine ? <div style={{ margin: '10px 0px 20px 0px' }} className="card__line" /> : null}
                </Fragment>
            ))}
        </CustomBlock>
  )
}

export default TokenomicsBlock
