import { useTranslation } from 'react-i18next';

import InfoTooltip from 'components/Custom/InfoTooltip';
import DelegatedValidatorsTable from 'components/Custom/Tables/DelegatedValidatorsTable';

import DelegationRewards from './components/DelegationRewards';
import UpdateDelegation from './components/UpdateDelegation';

function DelegationStaking () {
  const { t } = useTranslation();
  return (
    <>
      <div className="block">
        <div className="block_header">
          <div className="block_header-title">
            <h2 className="text-h2">{t('MANAGE_BALANCE')}</h2>
            <InfoTooltip topic="delegate-staking-power" />
          </div>
        </div>
        <DelegationRewards />
        <UpdateDelegation />
      </div>
      <DelegatedValidatorsTable />
    </>
  );
}

export default DelegationStaking;
