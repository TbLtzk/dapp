import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';

import TopUpQVault from 'components/TopUpQVault';

import useNetworkConfig from 'hooks/useNetworkConfig';
import useVoteDelegation from 'hooks/useVoteDelegation';
import useVoterStatus from 'hooks/useVoterStatus';

import { useBaseVotingWeightInfo } from 'store/proposals/hooks';
import { useQVault } from 'store/q-vault/hooks';

import { fromWei } from 'utils/web3';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;

  ${media.lessThan('medium')} {
    gap: 16px;
  }

  .voting-values {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function VotingOverview () {
  const { t } = useTranslation();
  const { baseVotingWeightInfo } = useBaseVotingWeightInfo();
  const { vaultBalance } = useQVault();
  const { qTicker } = useNetworkConfig();

  const userQVBalanceRef = useAnimateNumber(vaultBalance, ` ${qTicker}`);
  const weightRef = useAnimateNumber(fromWei(baseVotingWeightInfo.ownWeight), ` ${qTicker}`);

  const voterStatus = useVoterStatus();
  const delegationStatus = useVoteDelegation();

  return (
    <StyledWrapper className="block">
      <h2 className="text-h2">{t('OVERVIEW')}</h2>
      <div className="voting-values">
        <div>
          <p className="text-md color-secondary">{t('TOTAL_VOTING_WEIGHT')}</p>
          <p ref={weightRef} className="text-xl font-semibold" />
        </div>

        <div>
          <p className="text-md color-secondary">{t('VOTING_STATUS')}</p>
          <p className="text-xl font-semibold">{voterStatus}</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('QGOV_VAULT_BALANCE')}</p>
          <div>
            <span ref={userQVBalanceRef} className="text-xl font-semibold" />
            <TopUpQVault />
          </div>
        </div>

        <div>
          <p className="text-md color-secondary">{t('VOTE_DELEGATION')}</p>
          <p className="text-xl font-semibold">{delegationStatus}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default VotingOverview;
