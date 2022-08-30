import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { media } from 'styles/media';

import PageLayout from 'components/PageLayout';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import DelegateVoting from './components/DelegateVoting';
import LockVoting from './components/LockVoting';
import VotingOverview from './components/VotingOverview';

import { getDelegationInfo, getLockedAssets, getQVBalance } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/actions';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div`
  .voting-power-back {
    margin-bottom: 8px;
  }

  .voting-power-content {
    display: grid;
    gap: 24px;

    ${media.lessThan('medium')} {
      gap: 16px;
    }
  }

  .voting-power-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    ${media.lessThan('large')} {
      grid-template-columns: 1fr;
    }

    ${media.lessThan('medium')} {
      gap: 16px;
    }
  }
`;

function VotingPower () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getBaseVotingWeightInfo());
    dispatch(getLockedAssets(userAddress));
    dispatch(getDelegationInfo(userAddress));
    dispatch(getQVBalance());
  }, [dispatch]);

  return (
    <StyledWrapper>
      <Link to={RoutePaths.governance}>
        <Button
          block
          compact
          alwaysEnabled
          className="voting-power-back"
          look="ghost"
        >
          <Icon name="arrow-left" />
          <span>{t('GOVERNANCE')}</span>
        </Button>
      </Link>

      <PageLayout title={t('VOTING_POWER')}>
        <div className="voting-power-content">
          <VotingOverview />
          <div className="voting-power-main">
            <LockVoting />
            <DelegateVoting />
          </div>
        </div>
      </PageLayout>
    </StyledWrapper>
  );
}

export default VotingPower;
