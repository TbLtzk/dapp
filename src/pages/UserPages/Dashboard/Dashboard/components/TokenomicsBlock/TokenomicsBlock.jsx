import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { balance } from 'store/selectors/validation-reward-pools'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { updateCompoundRate } from 'store/selectors/q-vault'
import { getUpdateCompoundRate } from 'store/actions/action-creaters/q-vault'

import Handler from './handler'

import CustomBlock from 'components/Base/CustomBlock'
import CardBlock from 'components/Base/CardBlock'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { remainDateTimeSince } from 'func/convertDate'

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

  const [defaultAllocationProxy, setDefaultAllocationProxy] = useState('0')
  const [loadingDefaultAllocation, setLoadingDefaultAllocation] = useState(false)

  const [rootNodeRewardProxy, setRootNodeRewardProxy] = useState('0')
  const [loadingRootNodeReward, setLoadingRootNodeReward] = useState(false)

  const [validationRewardProxy, setValidationRewardProxy] = useState('0')
  const [loadingValidationReward, setLoadingValidationReward] = useState(false)

  const [systemReserve, setSystemReserve] = useState('0')
  const [validationRewardPools, setValidationRewardPools] = useState('0')
  const [QHolderRewardPool, setQHolderRewardPool] = useState('0')

  const [timeSinceQHolderRewardUpdate, setTimeSinceQHolderRewardUpdate] = useState('0')
  const [timeSinceUnixTimestamp, setTimeSinceUnixTimestamp] = useState('0')

  const balanceVRP = useSelector(balance)
  const handler = new Handler(userAddress)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceQHolderRewardUpdate(remainDateTimeSince(timeSinceUnixTimestamp))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [timeSinceUnixTimestamp])

  useEffect(async () => {
    setDefaultAllocationProxy('...')
    setRootNodeRewardProxy('...')
    setValidationRewardProxy('...')
    setQHolderRewardPool('...')
    setSystemReserve('...')
    setValidationRewardPools('...')

    handler.getDefaultAllocationProxy(setDefaultAllocationProxy, () => {}, false, null)
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false)
    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false)

    handler.getQHolderRewardPool(setQHolderRewardPool)
    handler.getSystemReserve(setSystemReserve)
    handler.getValidationRewardPools(setValidationRewardPools)
  }, [])

  useEffect(async () => {
    setQHolderRewardPool('...')
    handler.getQHolderRewardPool(setQHolderRewardPool)
  }, [timeSinceQHolderRewardUpdate])

  useEffect(() => {
    setRootNodeRewardProxy('...')
    setValidationRewardProxy('...')
    setQHolderRewardPool('...')
    setSystemReserve('...')

    handler.getValidationRewardProxy(setValidationRewardProxy, () => {}, false)
    handler.getRootNodeRewardProxy(setRootNodeRewardProxy, () => {}, false)

    handler.getQHolderRewardPool(setQHolderRewardPool)
    handler.getSystemReserve(setSystemReserve)
  }, [defaultAllocationProxy])

  useEffect(() => {
    setTimeSinceQHolderRewardUpdate('...')
    handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp)
  }, [])

  useEffect(() => {
    setValidationRewardPools('...')
    handler.getValidationRewardPools(setValidationRewardPools)
  }, [validationRewardProxy])

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
        title: 'Q Token Holder Reward Pool',
        firstContent: QHolderRewardPool + ' Q',
        btnTitle: null
      },
      {
        title: 'Q System Reserve',
        firstContent: systemReserve + ' Q',
        btnTitle: null
      },
      {
        title: 'Root Node Reward Proxy',
        firstContent: rootNodeRewardProxy + ' Q',
        btnTitle: 'Allocate',
        btnIcon: 'cube-outline',
        btnType: BTN_TYPES.rootNodeAllocation
      },
      {
        title: 'Validation Reward Pools',
        firstContent: validationRewardPools + ' Q',
        btnTitle: null
      },
      {
        title: 'Time Since Q Token Holder Reward Update',
        firstContent: timeSinceQHolderRewardUpdate,
        btnIcon: 'cached',
        iconFontSize: '20px',
        btnType: BTN_TYPES.timeSinceHolder
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
    timeSinceQHolderRewardUpdate
  ])

  const onRefresh = () => {
    dispatch(getUpdateCompoundRate(userAddress))
  }

  useEffect(() => {
    if (isUpdateCompoundRate === 'updated') {
      handler.getTimeSinceQHolderRewardUpdate(setTimeSinceQHolderRewardUpdate, setTimeSinceUnixTimestamp)
    }
  }, [isUpdateCompoundRate])

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
  return (
        <CustomBlock>
            <h1>Tokenomics</h1>
            {dataArr?.map((el) => {
              return (
                    <CardBlock
                        key={el.title.replace(' ', '-')}
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
              )
            })}
        </CustomBlock>
  )
}

export default TokenomicsBlock
