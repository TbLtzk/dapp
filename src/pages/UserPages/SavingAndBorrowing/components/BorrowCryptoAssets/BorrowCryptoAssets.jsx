import React, { useEffect } from 'react'
import CustomBlock from 'components/Base/CustomBlock'

import { useDispatch, useSelector } from 'react-redux'
import { getBorrowingVaults } from 'store/borrowing-core/action-creators'
import { borrowingVaultsSelector, loadingBorrowingVaultsSelector } from 'store/borrowing-core/selectors'
import MemberTables from 'components/Custom/MemberTables'
import { borrowCryptoAssets } from 'constants/tables'
import { borrowCryptoAssetsColumnns } from 'constants/columns'

function BorrowCryptoAssets () {
  const dispatch = useDispatch()
  const vaults = useSelector(borrowingVaultsSelector)
  const vaultsTable = borrowCryptoAssets(vaults)
  const loadingVaults = useSelector(loadingBorrowingVaultsSelector)

  useEffect(() => {
    dispatch(getBorrowingVaults())
  }, [])

  return (
        <CustomBlock>
            <MemberTables
                lineForEach={true}
                title="Borrow Crypto Assets"
                emptyTableMessage="No vaults created"
                table={vaultsTable}
                loading={loadingVaults}
                columns={borrowCryptoAssetsColumnns}
                perPageLength={vaults?.length}
            />
        </CustomBlock>
  )
}

export default BorrowCryptoAssets
