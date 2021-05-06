import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TableStyle, TableHeader } from './styles';

function VersionsTable(props) {
  const {
    data,
    header
  } = props;
  return (
    <>
      <TableHeader>{header}</TableHeader>
      <TableStyle responsive>
        <tbody>
        {
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
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
                    <CopyToClipboard text={`${item.name} - ${item.value}`}>
                      <span>{item.value}</span>
                    </CopyToClipboard>
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </TableStyle>
    </>
  );
}

export default VersionsTable;
