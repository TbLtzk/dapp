import React, { Suspense } from 'react';
import TableView from 'components/Base/TableView';
import { KeyAddressesTableWrap } from './style';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Sharing } from '../../../../../../../../components/Custom/MembersPanel/MemberTable/styles';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function KeyAddressesTable(props) {
  const {
    tableData,
    tableHeaders
  } = props;
  return (
    <KeyAddressesTableWrap>
      <TableView
        body={
          <>
            <tr>
              {tableHeaders.map(i => <th>{i}</th>)}
            </tr>
            {tableData.map((i, index) => {
              return (
                <tr key={index}>
                  <td>
                    {i.key}
                  </td>
                  <td>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={'tooltip-top' + index}>
                          <span>Copy to clipboard</span>
                        </Tooltip>
                      }
                    >
                      <CopyToClipboard text={i.value}>
                        <Sharing
                          type="button"
                          onClick={() => {
                          }}
                        >
                          <span>{i.value}</span>
                        </Sharing>
                      </CopyToClipboard>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </>
        }
      />
    </KeyAddressesTableWrap>
  );
}

export default KeyAddressesTable;
