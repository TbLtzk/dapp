import React, { useEffect } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import TableView from 'components/Base/TableView'
import BorrowManageAsset from '../BorrowManageAsset'

import { fN } from 'func/useful'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrowingVaults } from 'store/borrowing-core/action-creators'
import { borrowingVaultsSelector, loadingBorrowingVaultsSelector } from 'store/borrowing-core/selectors'
import LoadingSpinner from 'components/Base/LoadingSpinner'

const HEADERS = ['Collateral Asset', 'Borrowing Asset', 'Borrowing Fee (p.a.)', '']

function BorrowCryptoAssets () {
  const dispatch = useDispatch()
  const vaults = useSelector(borrowingVaultsSelector)
  const loadingVaults = useSelector(loadingBorrowingVaultsSelector)

  useEffect(() => {
    dispatch(getBorrowingVaults())
  }, [])

  return (
        <CustomBlock>
            <h1>Borrow Crypto Assets</h1>
            {loadingVaults
              ? (
                <LoadingSpinner />
                )
              : vaults.length
                ? (
                <TableView
                    type="with-action"
                    header={HEADERS}
                    body={vaults.map((vault, index) => (
                        <tr key={vault.colKey + '-' + vault.borrowingFee + index}>
                            <td>{vault.colKey}</td>
                            <td>QUSD</td>
                            <td>{fN(vault.borrowingFee)} %</td>
                            <td>
                                {vault.isLiquidated
                                  ? (
                                      'Vault is Liquidated'
                                    )
                                  : (
                                    <BorrowManageAsset vault={vault} />
                                    )}
                            </td>
                        </tr>
                    ))}
                />
                  )
                : (
                <>No vaults created</>
                  )}
        </CustomBlock>
  )
}

export default BorrowCryptoAssets
