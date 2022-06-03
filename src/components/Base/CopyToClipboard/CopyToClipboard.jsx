import React, { useState } from 'react';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';

import Tooltip from '../Tooltip';

function CopyToClipboard ({
  valueToCopy,
  title,
  hideTooltip = false,
  children,
  onCopy,
}) {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    setCopy(true);
    onCopy(true);

    setTimeout(() => {
      setCopy(false);
      onCopy(false);
    }, 3000);
  };

  return (
    <Tooltip
      disabled={hideTooltip}
      additionalInfo={copy ? 'Copied!' : title || 'Copy'}
    >
      <Copy text={valueToCopy}>
        <span
          style={{
            cursor: 'pointer',
            maxWidth: 'min-content'
          }}
          onClick={handleCopy}
        >
          {children}
        </span>
      </Copy>
    </Tooltip>
  );
}

export default CopyToClipboard;
