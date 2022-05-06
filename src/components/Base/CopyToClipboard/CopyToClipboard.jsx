import React, { useState } from 'react';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';

import Tooltip from '../Tooltip';

function CopyToClipboard ({ valueToCopy, title, children }) {
  const [copy, setCopy] = useState(false);

  const handleCopy = () => {
    setCopy(true);
    const timer = setTimeout(() => {
      setCopy(false);
      clearTimeout(timer);
    }, 3000);
  };

  return (
    <Tooltip additionalInfo={copy ? 'Copied!' : title || 'Copy'}>
      <Copy text={valueToCopy}>
        <span style={{ cursor: 'pointer', maxWidth: 'min-content' }} onClick={handleCopy}>
          {children}
        </span>
      </Copy>
    </Tooltip>
  );
}

export default CopyToClipboard;
