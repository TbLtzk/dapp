import { useState } from 'react';

import copy from 'copy-to-clipboard';

type CopiedValue = boolean;
type CopyFn = (text: string) => void;

function useCopyToClipboard (): [CopiedValue, CopyFn] {
  const [copied, setCopied] = useState<CopiedValue>(false);

  const copyToClipboard: CopyFn = async text => {
    try {
      copy(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return [copied, copyToClipboard];
}

export default useCopyToClipboard;
