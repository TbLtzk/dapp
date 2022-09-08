import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { media, Modal } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import AnnounceForm from './AnnounceForm';
import VotingAgent from './VotingAgent';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;
  
  .delegate-voting-action {
    margin-top: 8px;

    ${media.lessThan('medium')} {
      width: 100%;
    }
  }
`;

function DelegateVoting () {
  const { t } = useTranslation();
  const [announceModalOpen, setAnnounceModalOpen] = useState(false);

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-h2">
          {t('DELEGATE_VOTING_POWER')}
          <InfoTooltip topic="delegate-voting-power" />
        </h2>
        <p className="text-md color-secondary">
          {t('DELEGATE_VOTING_DESCRIPTION')}
        </p>
      </div>

      <VotingAgent />

      <Button
        className="delegate-voting-action"
        onClick={() => setAnnounceModalOpen(true)}
      >
        {t('ANNOUNCE_NEW_AGENT')}
      </Button>

      <Modal
        open={announceModalOpen}
        title={t('ANNOUNCE_NEW_VOTING_AGENT')}
        tip={t('THIS_WILL_IMMEDIATELY_REDUCE_VOTING_WEIGHT')}
        onClose={() => setAnnounceModalOpen(false)}
      >
        <AnnounceForm onSubmit={() => setAnnounceModalOpen(false)} />
      </Modal>
    </StyledWrapper>
  );
}

export default DelegateVoting;
