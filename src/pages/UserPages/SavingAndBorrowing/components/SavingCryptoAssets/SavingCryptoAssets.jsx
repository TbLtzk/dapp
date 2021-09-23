import React, { useEffect, useState } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import TableView from 'components/Base/TableView'
import SaveManageAsset from '../SaveManageAsset'

import { SavingQUSD } from 'contracts/src/Saving'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { fN, uintPerSecondToPerYearNumber } from 'func/useful'
import { useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'

const HEADERS = [
  'Deposit asset',
  'Interest asset',
  'Interest rate (p.a.)',
  ''
]

function SavingCryptoAssets () {
  const myAddress = useSelector(userAddressMetamask)

  const [assets, setAssets] = useState([])

  const fetchAssets = async () => {
    const contractSavingQUSD = new SavingQUSD(contractsToAddresses.SavingQUSD)
    const BalanceDetails = await contractSavingQUSD.getBalanceDetails(myAddress)
      .catch(() => {
      })
    const intRateL = uintPerSecondToPerYearNumber(BalanceDetails.interestRate)
    setAssets(
      [
        {
          depositAsset: 'QUSD',
          interestAsset: 'QUSD',
          rate: intRateL
        }
      ]
    )
  }

  useEffect(() => {
    fetchAssets()
  }, [])

  return (
    <CustomBlock>
      <h1>Saving Crypto Assets</h1>
      {
        assets.length
          ? <TableView
            type="with-action"
            header={HEADERS}
            body={
              assets.map(item => {
                return (
                  <tr key={item.depositAsset + '-' + item.interestAsset + item.rate}>
                    <td>
                      {item.depositAsset}
                    </td>
                    <td>
                      {item.interestAsset}
                    </td>
                    <td>
                      {fN(item.rate)}%
                    </td>
                    <td>
                      <SaveManageAsset
                        depositAsset={item.depositAsset}
                        interestAsset={item.interestAsset}
                        rate={item.rate}
                      />
                    </td>
                  </tr>
                )
              })
            }
          />
          : 'No Saving assets'
      }
    </CustomBlock>
  )
}

export default SavingCryptoAssets
