import React, { useEffect } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import TableView from 'components/Base/TableView'
import BorrowManageAsset from '../BorrowManageAsset'

import { fN } from 'func/useful'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrowingVaults } from 'store/borrowing-core/action-creators'
import { borrowingVaultsSelector } from 'store/borrowing-core/selectors'
import LoadingSpinner from 'components/Base/LoadingSpinner'

const HEADERS = ['Collateral Asset', 'Borrowing Asset', 'Borrowing Fee (p.a.)', '']

function BorrowCryptoAssets () {
  const dispatch = useDispatch()
  const assets = useSelector(borrowingVaultsSelector)

  useEffect(() => {
    dispatch(getBorrowingVaults())
  }, [])

  return (
        <CustomBlock>
            <h1>Borrow Crypto Assets</h1>
            {!assets
              ? (
                <LoadingSpinner />
                )
              : assets.length
                ? (
                <TableView
                    type="with-action"
                    header={HEADERS}
                    body={assets.map((item, index) => {
                      return (
                            <tr key={item.colKey + '-' + item.borrowingFee + index}>
                                <td>{item.colKey}</td>
                                <td>QUSD</td>
                                <td>{fN(item.borrowingFee)} %</td>
                                <td>
                                    <BorrowManageAsset borrowingAsset="QUSD" vault={item} />
                                </td>
                            </tr>
                      )
                    })}
                />
                  )
                : (
                <p>No vaults created</p>
                  )}
        </CustomBlock>
  )
}

export default BorrowCryptoAssets
