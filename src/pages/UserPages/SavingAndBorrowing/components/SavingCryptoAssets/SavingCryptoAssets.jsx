import React, { useEffect } from 'react'
import CustomBlock from 'components/Base/CustomBlock'

import { useDispatch, useSelector } from 'react-redux'
import { savingAssetsSelector } from 'store/borrowing-core/selectors'
import { getSavingAssets } from 'store/borrowing-core/action-creators'
import { savingCryptoAssetsColumnns } from 'constants/columns'
import { savingCryptoAssets } from 'constants/tables'
import MemberTables from 'components/Custom/MemberTables/MemberTables'

function SavingCryptoAssets () {
  const dispatch = useDispatch()
  const savingAssets = useSelector(savingAssetsSelector)
  const savingAssetsTable = savingCryptoAssets(savingAssets || [])
  useEffect(() => {
    dispatch(getSavingAssets())
  }, [])

  return (
        <CustomBlock>
            <MemberTables
                lineForEach={true}
                title="Saving Crypto Assets"
                emptyTableMessage="No Saving Assets"
                table={savingAssetsTable}
                loading={!savingAssets}
                columns={savingCryptoAssetsColumnns}
                perPageLength={savingAssets?.length}
            />
        </CustomBlock>
  )
}

export default SavingCryptoAssets
