import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPDRMembers } from 'store/actions/action-creaters/membership'
import { EPDRMembers, EPDRMembersLoading } from 'store/selectors/membership'

import CustomBlock from 'components/Base/CustomBlock/CustomBlock'
import MemberTables from 'components/Custom/MemberTables/MemberTables'
import TABLE_TYPES from 'constants/tableTypes'

function DefiMembersPanel () {
  const loading = useSelector(EPDRMembersLoading)
  const members = useSelector(EPDRMembers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEPDRMembers())
  }, [])

  return (
        <CustomBlock>
            <MemberTables
                tableType={TABLE_TYPES.qDefi}
                perPageLength={members.length}
                tableArray={members}
                title="List of DeFi Experts"
                loading={loading}
                emptyTable="No defi members"
                sorting={false}
            />
        </CustomBlock>
  )
}

export default DefiMembersPanel
