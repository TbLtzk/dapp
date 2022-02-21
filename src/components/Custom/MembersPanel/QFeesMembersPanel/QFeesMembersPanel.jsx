import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPQFIMembers } from 'store/membership/action-creators'
import {
  EPQFIMembersErrorSelector,
  EPQFIMembersLoadingSelector,
  EPQFIMembersSelector
} from 'store/membership/selectors'

import CustomBlock from 'components/Base/CustomBlock/CustomBlock'
import MemberTables from 'components/Custom/MemberTables'
import { tableQFees } from 'constants/tables'
import { columnsQFees } from 'constants/columns'

function QFeesMembersPanel () {
  const dispatch = useDispatch()

  const qFeesMembersTable = tableQFees(useSelector(EPQFIMembersSelector))
  const qFeesMembersTableLoading = useSelector(EPQFIMembersLoadingSelector)
  const qFeesMembersTableError = useSelector(EPQFIMembersErrorSelector)

  useEffect(() => {
    dispatch(getEPQFIMembers())
  }, [dispatch])

  return (
        <CustomBlock>
            <MemberTables
                emptyTableMessage="Empty list"
                title="List of Q Fees & Incentives Experts"
                table={qFeesMembersTable}
                loading={qFeesMembersTableLoading}
                error={qFeesMembersTableError}
                columns={columnsQFees}
                perPageLength={qFeesMembersTable.length}
            />
        </CustomBlock>
  )
}

export default QFeesMembersPanel
