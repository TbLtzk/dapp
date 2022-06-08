import React, { useEffect, useState } from 'react';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';

import Tooltip from '../Tooltip';

function CopyToClipboard ({
  value,
  title,
  hideTooltip = false,
  children,
  onCopy = () => {},
}) {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (!copy) return;

    onCopy(copy);
    const timeout = setTimeout(() => {
      setCopy(false);
      onCopy(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [copy, onCopy]);

  return (
    <Tooltip
      disabled={hideTooltip}
      additionalInfo={copy ? 'Copied!' : title || 'Copy'}
    >
      <Copy text={value}>
        <span
          style={{
            cursor: 'pointer',
            maxWidth: 'min-content'
          }}
          onClick={() => setCopy(true)}
        >
          {children || value}
        </span>
      </Copy>
    </Tooltip>
  );
}

export default CopyToClipboard;
