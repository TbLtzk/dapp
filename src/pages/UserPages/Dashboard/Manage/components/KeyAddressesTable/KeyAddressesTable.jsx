import React from 'react'
import TableView from 'components/Base/TableView'
import { KeyAddressesTableWrap } from './style'
import CopyToClipboard from 'components/Base/CopyToClipboard'

function KeyAddressesTable ({ tableData, tableHeaders }) {
  return (
        <KeyAddressesTableWrap>
            <TableView
                body={
                    <>
                        <tr>
                            {tableHeaders.map((item, index) => (
                                <th key={item + index}>{item}</th>
                            ))}
                        </tr>
                        {tableData.map((item, index) => (
                            <tr key={index}>
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
                    </>
                }
            />
        </KeyAddressesTableWrap>
  )
}

export default KeyAddressesTable
