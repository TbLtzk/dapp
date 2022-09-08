import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import NotFound from 'pages/NotFound';
import Spinner from 'ui/Spinner';

import ValidatorCharts from '../ValidatorCharts';

import DelegationInfo from './components/DelegationInfo';
import MainInfo from './components/MainInfo';
import MonitoringInfo from './components/MonitoringInfo';
import { useFetchValidatorData } from './hooks';

import { RoutePaths } from 'constants/routes';
import { trimAddress } from 'utils/strings';

const CenteredContainer = styled.div`
  display: flex;
  height: calc(100vh - 72px);
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  .info {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-areas: 'main-info validator-status delegation-info';
    gap: 24px;
  }

  .charts {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas: 'total-stake share';
    gap: 24px;
  }

  ${media.lessThan('large')} {
    .info {
      gap: 16px;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      grid-template-areas:
        'main-info'
        'validator-status'
        'delegation-info';
    }
  }

  ${media.lessThan('tablet')} {
    .charts {
      gap: 16px;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      grid-template-areas:
        'total-stake'
        'share';
    }
  }
`;

function Validator ({ match }: RouteComponentProps<{ address: string }>) {
  const { address } = match.params;
  const { t } = useTranslation();
  const { isValidator, validator, loading: validatorLoading, error: validatorError } = useFetchValidatorData(address);

  if (validatorLoading) {
    return (
      <CenteredContainer>
        <Spinner size={100} />
      </CenteredContainer>
    );
  }
  if (validatorError) {
    return (
      <CenteredContainer>
        <p className="text-xl font-semibold">{t('ERROR_PLEASE_TRY_AGAIN')}</p>
      </CenteredContainer>
    );
  }
  if (!isValidator) {
    return <NotFound />;
  }

  return (
    <>
      <Link to={RoutePaths.stakingValidators}>
        <Button
          alwaysEnabled
          compact
          look="ghost"
          style={{ marginBottom: '24px' }}
        >
          <Icon name="arrow-left" />
          <span>{t('GO_TO_VALIDATOR_STAKING')}</span>
        </Button>
      </Link>
      <PageLayout title={`${t('VALIDATOR')} ${trimAddress(address)}`}>
        <StyledContainer>
          <div className="info">
            <MainInfo validator={validator} />
            <MonitoringInfo validator={validator} />
            <DelegationInfo validator={validator} />
          </div>

          <div className="charts">
            <ValidatorCharts {...validator} />
          </div>
        </StyledContainer>
      </PageLayout>
    </>
  );
}

export default Validator;
