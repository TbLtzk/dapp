import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';
import DelegatedValidatorsTable from 'components/Custom/Tables/DelegatedValidatorsTable';

import DelegationRewards from './components/DelegationRewards';
import UpdateDelegation from './components/UpdateDelegation';

function DelegationStaking() {
  return (
    <div>
      <CustomBlock>
        <div className="card_header">
          <div className="card-title">
            <h2 className="text-h2">Manage Balance</h2>
            <InfoTooltip topic="delegate-staking-power" />
          </div>
        </div>


        <DelegationRewards />
        <div className="card__line" />
        <UpdateDelegation />
      </CustomBlock>
      <DelegatedValidatorsTable />
    </div>
  );
}

export default DelegationStaking;
