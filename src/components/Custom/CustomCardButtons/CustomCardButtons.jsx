import React, { useState } from 'react';
import { useAccordionToggle } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

function CustomCardButtons ({ eventKey, shareText, open, setOpen = () => {}, onePage }) {
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
            <Button
              alwaysEnabled
              title="Share"
              icon="share"
            />
          </div>
        </CopyToClipboard>
      </Tooltip>
      {onePage
        ? null
        : (
          <Button
            alwaysEnabled
            iconFontSize="16px"
            icon={`chevron-${open ? 'up' : 'down'}`}
            style={{ margin: '0 0 0 20px' }}
            onClick={handleOpen}
          />
        )}
    </>
  );
}

export default CustomCardButtons;
