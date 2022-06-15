import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import Blockchain from './Blockchain';
import Constitution from './Constitution';

import { mode } from 'store/dashboard-mode/selectors';
import {
  contractUpdatesActiveProposalsCountSelector,
  contractUpdatesEndedProposalsCountSelector,
  contractUpdatesLoadingProposalsCountSelector,
} from 'store/voting/contract-updates/selectors';
import {
  expertActiveProposalsCountSelector,
  expertEndedProposalsCountSelector,
  expertLoadingProposalsCountSelector,
} from 'store/voting/expert-proposals/selectors';
import {
  qActiveProposalsCountSelector,
  qEndedProposalsCountSelector,
  qLoadingProposalsCountSelector,
} from 'store/voting/q-proposals/selectors';
import {
  rootActiveProposalsCountSelector,
  rootEndedProposalsCountSelector,
  rootLoadingProposalsCountSelector,
} from 'store/voting/root-node-proposals/selectors';
import {
  slashingActiveProposalsCountSelector,
  slashingEndedProposalsCountSelector,
  slashingLoadingProposalsCountSelector,
} from 'store/voting/slashing-proposals/selectors';

function InfBlocksUp () {
  const appMode = useSelector(mode);

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector);
  const qEndedProposalsCount = useSelector(qEndedProposalsCountSelector);
  const qLoadingProposalsCount = useSelector(qLoadingProposalsCountSelector);

  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector);
  const rootEndedProposalsCount = useSelector(rootEndedProposalsCountSelector);
  const rootLoadingProposalsCount = useSelector(rootLoadingProposalsCountSelector);

  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector);
  const expertEndedProposalsCount = useSelector(expertEndedProposalsCountSelector);
  const expertLoadingProposalsCount = useSelector(expertLoadingProposalsCountSelector);

  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector);
  const slashingEndedProposalsCount = useSelector(slashingEndedProposalsCountSelector);
  const slashingLoadingProposalsCount = useSelector(slashingLoadingProposalsCountSelector);

  const contractUpdatesActiveProposalsCount = useSelector(contractUpdatesActiveProposalsCountSelector);
  const contractUpdatesEndedProposalsCount = useSelector(contractUpdatesEndedProposalsCountSelector);
  const contractUpdatesLoadingProposalsCount = useSelector(contractUpdatesLoadingProposalsCountSelector);

  const activeAdvancedProposals =
    appMode === MODE.basic
      ? 0
      : expertActiveProposalsCount + slashingActiveProposalsCount + contractUpdatesActiveProposalsCount;

  const activeProposals = qActiveProposalsCount + rootActiveProposalsCount + activeAdvancedProposals;

  const endedAdvancedProposals =
    appMode === MODE.basic
      ? 0
      : expertEndedProposalsCount + slashingEndedProposalsCount + contractUpdatesEndedProposalsCount;

  const endedProposals = rootEndedProposalsCount + qEndedProposalsCount + endedAdvancedProposals;

  const loadingAdvancedProposals =
    appMode === MODE.basic
      ? false
      : expertLoadingProposalsCount || slashingLoadingProposalsCount || contractUpdatesLoadingProposalsCount;

  const loadingProposals = qLoadingProposalsCount || rootLoadingProposalsCount || loadingAdvancedProposals;

  return (
    <>
      <Blockchain />
      <Constitution />
      <CustomBlock title="Governance">
        <h1>Governance</h1>

        <div className="card__two-columns">
          <div>
            <h5>Active Proposals</h5>
            {loadingProposals ? <LoadingSpinner className="card__spinner" /> : <p>{activeProposals}</p>}
          </div>
          <div>
            <h5>Past Proposals</h5>
            {loadingProposals ? <LoadingSpinner className="card__spinner" /> : <p>{endedProposals}</p>}
          </div>
        </div>
        <Link to="/governance">
          <Button alwaysEnabled look="white">
            <i className="mdi mdi-arrow-right" />
            <span>Go to Governance</span>
          </Button>
        </Link>
      </CustomBlock>
    </>
  );
}

export default InfBlocksUp;
