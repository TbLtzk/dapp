import React from 'react'
import CopyToClipboard from 'components/Base/CopyToClipboard'
import { TableStyle } from 'components/Base/TableView/styles'

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
                                <CopyToClipboard valueToCopy={item.value}>
                                    <span>{String(item.value)}</span>
                                </CopyToClipboard>
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
