import React, { useEffect, useState } from 'react'
import CustomBlock from 'components/Base/CustomBlock'
import TableView from 'components/Base/TableView'
import BorrowManageAsset from '../BorrowManageAsset'

import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { fN, uintPerSecondToPerYearNumber } from 'func/useful'
import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore'
import { useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'

const HEADERS = [
  'Collateral Asset',
  'Borrowing Asset',
  'Borrowing Fee (p.a.)',
  ''
]

function BorrowCryptoAssets ({ reload }) {
  const myAddress = useSelector(userAddressMetamask)
  const contract = new BorrowingCoreQUSD(contractsToAddresses.BorrowingCoreQUSD)
  const [assets, setAssets] = useState([])

  const fetchBorrowAssets = async () => {
    const userVaultsCount = await contract.userVaultsCount(myAddress)

    const count = new Array(+userVaultsCount)
    count.fill('')

    async function getAdditionalData (index) {
      const res = await Promise.all([
        await contract.userVaults(myAddress, index),
        await contract.getVaultStats(myAddress, index)
      ])
      const fee = res[1]?.stcStats?.borrowingFee ? uintPerSecondToPerYearNumber(res[1]?.stcStats?.borrowingFee) : 0
      const vaultInfo = res[0]
      vaultInfo.borrowingFee = fee
      vaultInfo.vaultNum = index
      return vaultInfo
    }

    const vaultsLoc = await Promise.all(count.map((i, index) => getAdditionalData(index)))

    setAssets(vaultsLoc)
  }

  useEffect(() => {
    if (!reload) {
      fetchBorrowAssets()
    }
  }, [reload])

  return (
    <CustomBlock>
      <h1>Borrow Crypto Assets</h1>
      {
        assets.length
          ? <TableView
            type='with-action'
            header={HEADERS}
            body={
              assets.map((item, index) => {
                return (
                  <tr key={item.colKey + '-' + item.borrowingFee + index}>
                    <td>
                      {item.colKey}
                    </td>
                    <td>
                      QUSD
                    </td>
                    <td>
                      {fN(item.borrowingFee)}%
                    </td>
                    <td>
                      <BorrowManageAsset
                        borrowingAsset="QUSD"
                        vault={item}
                      />
                    </td>
                  </tr>
                )
              })
            }
          />
          : 'No Borrow assets'
      }
    </CustomBlock>
  )
}

export default BorrowCryptoAssets
