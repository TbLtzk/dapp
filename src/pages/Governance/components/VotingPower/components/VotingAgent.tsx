import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tag from 'ui/Tag';

import { setAnnounceNewVotingAgent, setNewVotingAgent } from 'store/q-vault/action-creators';
import { isPendingDelegation, votingAgent, votingAgentPassOverTime } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { formatDateRelative, unixToDate } from 'utils/date';

const StyledWrapper = styled.div`
  .voting-agent-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    ${media.lessThan('medium')} {
      flex-wrap: wrap;
      gap: 16px;
    }
  }

  .voting-agent-status {
    display: flex;
    gap: 8px;
  }
`;

function VotingAgent () {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const agent = useSelector(votingAgent);
  const userAddress = useSelector(userAddressMetamask);

  const isPending = useSelector(isPendingDelegation);
  const isUserAgent = agent === userAddress || agent === ZERO_ADDRESS;

  const confirmDate = unixToDate(useSelector(votingAgentPassOverTime));
  const canConfirmAgent = Date.now() > confirmDate.getTime();

  return (
    <StyledWrapper>
      <p className="text-md color-secondary">{t('CURRENT_AGENT')}</p>
      <div className="text-xl font-semibold voting-agent-value">
        <div className="voting-agent-status">
          {agent
            ? isUserAgent
              ? t('NO_AGENT')
              : (
                <ExplorerAddress
                  short
                  semibold
                  iconed
                  address={agent}
                />
              )
            : '...'
          }

          {isPending && <Tag state="pending">{t('PENDING')}</Tag>}
        </div>

        {isPending && (
          <Button
            compact
            disabled={!canConfirmAgent}
            onClick={() => dispatch(setNewVotingAgent(t('DELEGATE_VOTING_POWER_SUCCESS')))}
          >
            <Icon name="check-circle" />
            <span>{t('CONFIRM')}</span>
            {!canConfirmAgent && (
              <span>{formatDateRelative(confirmDate, i18n.language)}</span>
            )}
          </Button>
        )}

        {!isPending && !isUserAgent && (
          <Button
            compact
            look="danger"
            onClick={() => dispatch(setAnnounceNewVotingAgent(userAddress, t('ANNOUNCE_NEW_VOTING_AGENT_SUCCESS')))}
          >
            {t('REMOVE')}
          </Button>
        )}
      </div>
    </StyledWrapper>
  );
}

export default VotingAgent;
