import { useEffect, useState } from 'react';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';

import PopperTooltip from '../PopperTooltip';

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

  const copyTrigger = (
    <Copy text={value}>
      <CopyTrigger onClick={() => setIsCopied(true)}>
        <i className={`mdi mdi-${isCopied ? 'check-circle-outline' : 'content-copy'}`} />
      </CopyTrigger>
    </Copy>
  );

  return hideTooltip
    ? copyTrigger
    : (
      <TooltipWrapper>
        <PopperTooltip trigger={copyTrigger}>
          <span className="copy-msg">
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </PopperTooltip>
      </TooltipWrapper>
    );
}

export default CopyToClipboard;
