import { useState } from 'react';
import { useAccordionToggle } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import copy from 'copy-to-clipboard';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

function CustomCardButtons ({
  shareText,
  eventKey = '',
  open = false,
  setOpen = () => {},
  onePage = false
}) {
  const { t } = useTranslation();

  const decoratedOnClick = useAccordionToggle(eventKey, () => {});
  const [copied, setCopied] = useState(false);

  function handleOpen () {
    decoratedOnClick();
    setOpen();
  }

  const handleCopy = () => {
    copy(shareText);
    setCopied(true);
    const timer = setTimeout(() => {
      setCopied(false);
      clearTimeout(timer);
    }, 3000);
  };

  return (
    <>
      <Tooltip
        copy={true}
        disabled={false}
        additionalInfo={`${copied ? t('COPIED') : t('COPY')}`}
      >
        <Button alwaysEnabled onClick={handleCopy}>
          <i className="mdi mdi-share" />
          <span>Share</span>
        </Button>
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
