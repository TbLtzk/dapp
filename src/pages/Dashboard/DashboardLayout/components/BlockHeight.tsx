import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { fetchBlockNumber } from 'contracts/helpers/block-number';

import { formatDate } from 'utils/date';

const StyledWrapper = styled.div`
  grid-area: block;
  padding: 24px 24px 16px;

  .block-height__val {
    margin-top: 4px;
  }

  .block-height__date {
    margin-top: 16px;
  }
`;

function BlockHeight () {
  const { t, i18n } = useTranslation();

  const [blockNumber, setBlockNumber] = useState(0);
  const blockNumberRef = useAnimateNumber(blockNumber, ' ', val => formatNumber(val, 0));

  const getLatestBlock = () => {
    fetchBlockNumber('latest').then((blockNumber) => setBlockNumber(blockNumber));
  };

  useInterval(() => {
    getLatestBlock();
  }, 5000);

  useEffect(() => {
    getLatestBlock();
  }, []);

  return (
    <StyledWrapper className="block">
      <h2 className="text-lg">{t('BLOCK_HEIGHT')}</h2>
      <p ref={blockNumberRef} className="block-height__val text-xl font-semibold">0</p>
      <p className="block-height__date text-sm font-light">{formatDate(Date.now(), i18n.language)}</p>
    </StyledWrapper>
  );
}

export default BlockHeight;
