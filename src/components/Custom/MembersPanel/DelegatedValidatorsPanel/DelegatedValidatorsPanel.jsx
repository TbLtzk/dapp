import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getDelegationsList } from 'store/actions/action-creaters/q-vault'
import { loadingDelegationList, delegationList } from 'store/selectors/q-vault'

import MemberTables from 'components/Custom/MemberTables/MemberTables'
import CustomBlock from 'components/Base/CustomBlock'
import TABLE_TYPES from 'constants/tableTypes'

function DelegatedValidatorsPanel () {
  const loading = useSelector(loadingDelegationList)
  const delegations = useSelector(delegationList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDelegationsList())
  }, [])

  return (
        <CustomBlock>
            <MemberTables
                tableType={TABLE_TYPES.delegations}
                perPageLength={delegations.length}
                tableArray={delegations}
                title="Your current delegations"
                loading={loading}
                emptyTable="Empty"
            />
        </CustomBlock>
  )
}

export default DelegatedValidatorsPanel
