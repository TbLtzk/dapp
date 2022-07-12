import { useEffect, useState } from 'react';

import copy from 'copy-to-clipboard';
import Tooltip from 'ui/Tooltip';

import { CopyTrigger, TooltipWrapper } from './styles';

function CopyToClipboard ({
  value,
  hideTooltip = false,
}) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = () => {
    copy(value);
    setIsCopied(true);
  };

  const copyTrigger = (
    <CopyTrigger onClick={handleCopy}>
      <i className={`mdi mdi-${isCopied ? 'check-circle-outline' : 'content-copy'}`} />
    </CopyTrigger>
  );

  return hideTooltip
    ? copyTrigger
    : (
      <TooltipWrapper>
        <Tooltip trigger={copyTrigger}>
          <span className="copy-msg">
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </Tooltip>
      </TooltipWrapper>
    );
}

export default CopyToClipboard;
