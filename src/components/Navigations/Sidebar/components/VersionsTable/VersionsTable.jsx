import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import CopyToClipboard from 'components/Base/CopyToClipboard';

function VersionsTable (props) {
  const {
    data,
    header
  } = props;
  return (
    <>
      <h3>{header}</h3>
      {data?.map((line, index) => {
        return (
          <div key={index + '-validator-line'} style={{ display: 'flex' }}>
            {
              line.map(item => {
                const text = item.name + '-' + item.value;
                return (
                  <div key={item.name + '-validator-pool'} style={{ width: '50%' }}>
                    <h5>{item.name}</h5>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={'tooltip-top' + index}>
                          <span>Copy to clipboard</span>
                        </Tooltip>
                      }
                    >
                      <p>
                        <span>{item.value}</span>
                        <CopyToClipboard value={text} />
                      </p>
                    </OverlayTrigger>
                  </div>
                );
              })
            }
          </div>
        );
      })}
    </>
  );
}

export default VersionsTable;
