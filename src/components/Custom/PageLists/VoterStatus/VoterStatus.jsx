import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsUserValidator } from 'store/validators/action-creators'
import { getUserBalance } from 'store/q-vault/action-creators'
import { getIsUserEPDRMember, getIsUserEPQFIMember } from 'store/membership/action-creators'

import { isUserRootNode } from 'store/root-node/selectors'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { isUserValidator } from 'store/validators/selectors'
import { isUserEPDRMembership, isUserEPQFIMembership } from 'store/membership/selectors'

import { userBalance } from 'store/q-vault/selectors'

function VoterStatus () {
  const dispatch = useDispatch()
  const userAddress = useSelector(userAddressMetamask)
  const isRootNode = useSelector(isUserRootNode)
  const isValidator = useSelector(isUserValidator)
  const userQVBalance = useSelector(userBalance)
  const isEPDRMembership = useSelector(isUserEPDRMembership)
  const isEPQFIMembership = useSelector(isUserEPQFIMembership)

  useEffect(() => {
    dispatch(getIsUserValidator(userAddress))
    dispatch(getUserBalance(userAddress))
    dispatch(getIsUserEPDRMember(userAddress))
    dispatch(getIsUserEPQFIMember(userAddress))
  }, [])

  const showStatus = useMemo(() => {
    const arrStatus = []
    if (isRootNode) {
      arrStatus.push('Root node')
    }
    if (isValidator) {
      arrStatus.push('Validator')
    }
    if (userQVBalance !== '0') {
      arrStatus.push('Q token holder')
    }
    if (isEPDRMembership) {
      arrStatus.push('DeFi risk expert')
    }
    if (isEPQFIMembership) {
      arrStatus.push('Fees & Incentive expert')
    }
    if (arrStatus.length === 0) {
      return 'None'
    } else {
      return arrStatus.join(', ')
    }
  }, [isRootNode, isValidator, userQVBalance, isEPDRMembership, isEPQFIMembership])

  return <>{showStatus}</>
}

export default VoterStatus
