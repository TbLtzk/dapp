import React, { useEffect } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import TableView from 'components/Base/TableView'
import SaveManageAsset from '../SaveManageAsset'

import { fN } from 'func/useful'
import { useDispatch, useSelector } from 'react-redux'
import { savingAssetsSelector } from 'store/borrowing-core/selectors'
import { getSavingAssets } from 'store/borrowing-core/action-creators'
import LoadingSpinner from 'components/Base/LoadingSpinner'

const HEADERS = ['Deposit asset', 'Interest asset', 'Interest rate (p.a.)', '']

function SavingCryptoAssets () {
  const dispatch = useDispatch()
  const savingAssets = useSelector(savingAssetsSelector)

  useEffect(() => {
    dispatch(getSavingAssets())
  }, [])

  return (
        <CustomBlock>
            <h1>Saving Crypto Assets</h1>
            {!savingAssets
              ? (
                <LoadingSpinner />
                )
              : savingAssets.length
                ? (
                <TableView
                    type="with-action"
                    header={HEADERS}
                    body={savingAssets.map((item) => {
                      return (
                            <tr key={item.depositAsset + '-' + item.interestAsset + item.rate}>
                                <td>{item.depositAsset}</td>
                                <td>{item.interestAsset}</td>
                                <td>{fN(item.rate)} %</td>
                                <td>
                                    <SaveManageAsset
                                        depositAsset={item.depositAsset}
                                        interestAsset={item.interestAsset}
                                        rate={item.rate}
                                    />
                                </td>
                            </tr>
                      )
                    })}
                />
                  )
                : (
                <p>No saving assets</p>
                  )}
        </CustomBlock>
  )
}

export default SavingCryptoAssets
