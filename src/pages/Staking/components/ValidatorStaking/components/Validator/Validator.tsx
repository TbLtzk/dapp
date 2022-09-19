import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { media } from 'styles/media';
import { Validator } from 'typings/validator';

import PageLayout from 'components/PageLayout';
import NotFound from 'pages/NotFound';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Spinner from 'ui/Spinner';

import ValidatorCharts from '../ValidatorCharts';

import DelegationInfo from './components/DelegationInfo';
import MainInfo from './components/MainInfo';
import MonitoringInfo from './components/MonitoringInfo';
import RewardStats from './components/RewardStats';
import { useFetchValidatorData } from './hooks';

import { useTransaction } from 'store/transaction/hooks';

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
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
      'main-info validator-status'
      'reward-stats delegation-info';
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
        'reward-stats'
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

const ValidatorContext = createContext({
  validator: {} as Validator,
  refetchValidator: () => {}
});

function ValidatorPage ({ match }: RouteComponentProps<{ address: string }>) {
  const { address } = match.params;
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    isValidator,
    validator,
    loading: validatorLoading,
    error: validatorError,
    refetchValidator,
    updateCompoundRate
  } = useFetchValidatorData(address);

  if (validatorLoading && !validator.address) {
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
    <ValidatorContext.Provider value={{ validator, refetchValidator }}>
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
            <MainInfo />
            <MonitoringInfo />
            <DelegationInfo />
            <RewardStats
              validator={validator}
              onButtonClick={() => submitTransaction({
                successMessage: t('REFRESH_OF_USER_DELEGATIONS_SUCCESS'),
                submitFn: updateCompoundRate
              })}
            />
          </div>

          <div className="charts">
            <ValidatorCharts {...validator} />
          </div>
        </StyledContainer>
      </PageLayout>
    </ValidatorContext.Provider>
  );
}

export const useValidator = () => useContext(ValidatorContext);

export default ValidatorPage;
