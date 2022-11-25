import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import { formatNumberFixed } from '@q-dev/utils';
import styled from 'styled-components';

import { useQVault } from 'store/q-vault/hooks';
import { useTokenomics } from 'store/tokenomics/hooks';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 16px 32px;
  justify-content: space-between;
  width: 100%;
`;

function AprBlock () {
  const { t } = useTranslation();
  const { qvBalance, loadQVBalanceDetails } = useQVault();
  const {
    rootNodesAPR,
    validatorsAPR,
    getValidatorsAPR,
    getRootNodesAPR
  } = useTokenomics();

  const balanceInterestRateRef = useAnimateNumber(qvBalance.interestRatePercentage, ' %');
  const rootNodesAPRRef = useAnimateNumber(rootNodesAPR, ' %', formatNumberFixed);
  const validatorsAPRRef = useAnimateNumber(validatorsAPR, ' %', formatNumberFixed);

  useEffect(() => {
    loadQVBalanceDetails();
    getValidatorsAPR();
    getRootNodesAPR();
  }, []);

  return (
    <StyledWrapper className="block">
      <div>
        <p ref={validatorsAPRRef} className="text-xl font-semibold">0 %</p>
        <p className="text-md color-secondary">{t('VALIDATOR_NODES_APR')}</p>
      </div>
      <div>
        <p ref={rootNodesAPRRef} className="text-xl font-semibold">0 %</p>
        <p className="text-md color-secondary">{t('ROOT_NODES_APR')}</p>
      </div>
      <div>
        <p ref={balanceInterestRateRef} className="text-xl font-semibold">0 %</p>
        <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_RATE')}</p>
      </div>
    </StyledWrapper>
  );
}

export default AprBlock;
