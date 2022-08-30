import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';
import { fromWei } from 'web3-utils';

import TopUpQVault from 'components/TopUpQVault';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useVoteDelegation from 'hooks/useVoteDelegation';
import useVoterStatus from 'hooks/useVoterStatus';

import { userBalance, } from 'store/q-vault/selectors';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

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

  const { ownWeight } = useSelector(baseVotingWeightInfoSelector);
  const weightRef = useAnimateNumber(fromWei(ownWeight || '0'));

  const userQVBalance = useSelector(userBalance);
  const userQVBalanceRef = useAnimateNumber(userQVBalance);

  const voterStatus = useVoterStatus();
  const delegationStatus = useVoteDelegation();

  return (
    <StyledWrapper className="block">
      <h2 className="text-h2">{t('OVERVIEW')}</h2>
      <div className="voting-values">
        <div>
          <p className="text-md color-secondary">{t('TOTAL_VOTING_WEIGHT')}</p>
          <p ref={weightRef} className="text-xl font-semibold">0 Q</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('VOTING_STATUS')}</p>
          <p className="text-xl font-semibold">{voterStatus}</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('Q_VAULT_BALANCE')}</p>
          <div>
            <span ref={userQVBalanceRef} className="text-xl font-semibold">0 Q</span>
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
