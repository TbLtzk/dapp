import React from 'react'

import CopyToClipboard from 'components/Base/CopyToClipboard'
import { TableStyle } from 'components/Base/TableView/styles'
import ExplorerAddress from 'components/Custom/ExplorerAddress'

function KeyAddressesTable ({ tableData, tableHeaders }) {
  return (
        <TableStyle>
            <table>
                <thead>
                    {tableHeaders.map((item, index) => (
                        <th key={item + index}>{item}</th>
                    ))}
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={item.key + index}>
                            <td>
                                <CopyToClipboard valueToCopy={item.key}>
                                    <span>{item.key}</span>
                                </CopyToClipboard>
                            </td>

                            <td>
                                {item.type === 'ADDR'
                                  ? <ExplorerAddress address={item.value} />
                                  : (
                                        <CopyToClipboard valueToCopy={item.value}>
                                            {item.value}
                                        </CopyToClipboard>
                                    )
                                }
                            </td>
                            <td>
                                <span>{item.type}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableStyle>
  )
}

export default KeyAddressesTable
