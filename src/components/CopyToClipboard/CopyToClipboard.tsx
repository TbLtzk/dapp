import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@q-dev/q-ui-kit';
import copy from 'copy-to-clipboard';

import Tooltip from 'ui/Tooltip';

import { CopyTrigger, TooltipWrapper } from './styles';

interface Props {
  value: string;
  hideTooltip?: boolean;
}

function CopyToClipboard ({
  value,
  hideTooltip = false,
}: Props) {
  const { t } = useTranslation();
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
      <Icon name={isCopied ? 'check-circle' : 'copy'} />
    </CopyTrigger>
  );

  return hideTooltip
    ? copyTrigger
    : (
      <TooltipWrapper>
        <Tooltip trigger={copyTrigger}>
          <span className="copy-msg">
            {isCopied ? t('COPIED') : t('COPY')}
          </span>
        </Tooltip>
      </TooltipWrapper>
    );
}

export default CopyToClipboard;
