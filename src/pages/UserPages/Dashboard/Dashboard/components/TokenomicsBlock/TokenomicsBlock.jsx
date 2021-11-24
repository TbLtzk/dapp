import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { balance } from 'store/validation-reward-pools/selectors'
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

  const [defaultAllocationProxy, setDefaultAllocationProxy] = useState('...')
  const [loadingDefaultAllocation, setLoadingDefaultAllocation] = useState(false)

  const [rootNodeRewardProxy, setRootNodeRewardProxy] = useState('...')
  const [loadingRootNodeReward, setLoadingRootNodeReward] = useState(false)

  const [validationRewardProxy, setValidationRewardProxy] = useState('...')
  const [loadingValidationReward, setLoadingValidationReward] = useState(false)

  const [systemReserve, setSystemReserve] = useState('...')
  const [validationRewardPools, setValidationRewardPools] = useState('...')
  const [QHolderRewardPool, setQHolderRewardPool] = useState('...')

  const [timeSinceQHolderRewardUpdate, setTimeSinceQHolderRewardUpdate] = useState('...')
  const [timeSinceUnixTimestamp, setTimeSinceUnixTimestamp] = useState('...')

  const balanceVRP = useSelector(balance)
  const handler = new Handler(userAddress, dispatch, setErrorMessage)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceQHolderRewardUpdate(remainDateTimeSince(timeSinceUnixTimestamp))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [timeSinceUnixTimestamp])

  useEffect(() => {
    handler.getQHolderRewardPool(setQHolderRewardPool)
  }, [timeSinceQHolderRewardUpdate])

  useEffect(() => {
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false)
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false)

    handler.getQHolderRewardPool(setQHolderRewardPool)
    handler.getSystemReserve(setSystemReserve)
  }, [defaultAllocationProxy])

  useEffect(() => {
    handler.getValidationRewardPools(setValidationRewardPools)
  }, [validationRewardProxy])

  useEffect(() => {
    if (isUpdateCompoundRate === 'updated') {
      handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp)
    }
  }, [isUpdateCompoundRate])

  useEffect(() => {
    dispatch(getQVBalance())
    handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp)
    handler.getDefaultAllocationProxy(setDefaultAllocationProxy, () => {}, false, null)
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false)
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false)

    handler.getQHolderRewardPool(setQHolderRewardPool)
    handler.getSystemReserve(setSystemReserve)
    handler.getValidationRewardPools(setValidationRewardPools)
  }, [])

  const onAllocate = useCallback((type) => {
    switch (type) {
      case BTN_TYPES.defaultAllocation:
        handler.getDefaultAllocationProxy(setDefaultAllocationProxy, setLoadingDefaultAllocation, true, null)
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
        firstContent: fN(validationRewardProxy) + ' Q',
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
        firstContent: QHolderRewardPool + ' Q',
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
        firstContent: systemReserve + ' Q',
        btnTitle: null
      },
      {
        title: 'Validation Reward Pools',
        firstContent: validationRewardPools + ' Q',
        btnTitle: null
      }
    ]
  }, [
    defaultAllocationProxy,
    validationRewardPools,
    validationRewardProxy,
    systemReserve,
    balanceVRP,
    rootNodeRewardProxy,
    QHolderRewardPool,
    timeSinceQHolderRewardUpdate,
    balanceDetails
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
