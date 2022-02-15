import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPDRMembers } from 'store/membership/action-creators'
import { EPDRMembers, EPDRMembersLoading } from 'store/membership/selectors'

import CustomBlock from 'components/Base/CustomBlock/CustomBlock'
import MemberTables from 'components/Custom/MemberTables/MemberTables'
import { columnsDeFiRisk } from 'constants/columns'
import { tableDefiRisks } from 'constants/tables'

function DefiMembersPanel () {
  const defiMembersTableLoading = useSelector(EPDRMembersLoading)
  const defiMembersTable = tableDefiRisks(useSelector(EPDRMembers))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEPDRMembers())
  }, [dispatch])

  return (
        <CustomBlock>
            <MemberTables
                perPageLength={defiMembersTable.length}
                table={defiMembersTable}
                title="List of DeFi Experts"
                loading={defiMembersTableLoading}
                emptyTableMessage="No DeFi members"
                sorting={false}
                columns={columnsDeFiRisk}
            />
        </CustomBlock>
  )
}

export default DefiMembersPanel
