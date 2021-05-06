import React, { Suspense } from 'react';
import TableView from 'components/Base/TableView';
import { KeyAddressesTableWrap } from './style';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import colors from 'constants/colors';

function KeyAddressesTable(props) {
  const {
    tableData,
    tableHeaders
  } = props;
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content style={{
        background: colors.neonGreen,
      }}>
        Copy
      </Popover.Content>
    </Popover>
  );

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
                      overlay={popover}
                    >
                      <CopyToClipboard text={i.value}>
                        <span>{i.value}</span>
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
