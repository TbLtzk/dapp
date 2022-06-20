import { useState } from 'react';
import { useAccordionToggle } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

function CustomCardButtons ({
  shareText,
  eventKey = '',
  open = false,
  setOpen = () => {},
  onePage = false
}) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {});
  const [copy, setCopy] = useState(false);

  function handleOpen () {
    decoratedOnClick();
    setOpen();
  }

  const handleCopy = () => {
    setCopy(true);
    const timer = setTimeout(() => {
      setCopy(false);
      clearTimeout(timer);
    }, 3000);
  };

  return (
    <>
      <Tooltip
        copy={true}
        disabled={false}
        additionalInfo={`${copy ? 'Copied!' : 'Copy'}`}
      >
        <CopyToClipboard text={shareText} onCopy={handleCopy}>
          <div>
            <Button alwaysEnabled>
              <i className="mdi mdi-share" />
              <span>Share</span>
            </Button>
          </div>
        </CopyToClipboard>
      </Tooltip>
      {onePage
        ? null
        : (
          <Button
            alwaysEnabled
            style={{ margin: '0 0 0 20px' }}
            onClick={handleOpen}
          >
            <i
              className={`mdi mdi-chevron-${open ? 'up' : 'down'}`}
              style={{ fontSize: '16px' }}
            />
          </Button>
        )}
    </>
  );
}

export default CustomCardButtons;
