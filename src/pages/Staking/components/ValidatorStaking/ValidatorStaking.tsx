import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import ValidatorsOverview from './components/ValidatorsOverview';
import ValidatorsTable from './components/ValidatorsTable';

import { RoutePaths } from 'constants/routes';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-ranking',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function ValidatorStaking () {
  const { t } = useTranslation();

  return (
    <>
      <div className="block">
        <div className="block_header">
          <div className="block_header-title">
            <h2 className="text-h2">{t('VALIDATORS_OVERVIEW')}</h2>
            <InfoTooltip topic="validator-staking" placement="top" />
          </div>
          <div className="block_header-buttons">
            <Link to={RoutePaths.stakingValidatorManage}>
              <Button
                block
                alwaysEnabled
                look="secondary"
              >
                {t('VALIDATOR_MANAGE')}
              </Button>
            </Link>
          </div>
        </div>
        <ValidatorsOverview />
      </div>
      <ValidatorsTable />
    </>
  );
}

export default ValidatorStaking;
