import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getDelegationsList } from 'store/q-vault/action-creators'
import { loadingDelegationList, delegationList } from 'store/q-vault/selectors'

import MemberTables from 'components/Custom/MemberTables/MemberTables'
import { columnsDelegations } from 'constants/columns'
import { tableDelegations } from 'constants/tables'

function DelegatedValidatorsPanel () {
  const loading = useSelector(loadingDelegationList)
  const delegations = tableDelegations(useSelector(delegationList))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDelegationsList())
  }, [])

  return (
        <>
            <MemberTables
                perPageLength={delegations.length}
                table={delegations}
                title="Your Current Delegations"
                loading={loading}
                emptyTableMessage="No delegations"
                columns={columnsDelegations}
            />
        </>
  )
}

export default DelegatedValidatorsPanel
