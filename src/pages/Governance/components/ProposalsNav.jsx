import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';

import { mode } from 'store/dashboard-mode/selectors';
import { getContractUpdatesProposals } from 'store/voting/contract-updates/action-creators';
import { contractUpdatesActiveProposalsCountSelector } from 'store/voting/contract-updates/selectors';
import { getExpertProposals } from 'store/voting/expert-proposals/action-creators';
import { expertActiveProposalsCountSelector } from 'store/voting/expert-proposals/selectors';
import { getQProposals } from 'store/voting/q-proposals/action-creators';
import { qActiveProposalsCountSelector } from 'store/voting/q-proposals/selectors';
import { getRootProposals } from 'store/voting/root-node-proposals/action-creators';
import { rootActiveProposalsCountSelector } from 'store/voting/root-node-proposals/selectors';
import { getSlashingProposals } from 'store/voting/slashing-proposals/action-creators';
import { slashingActiveProposalsCountSelector } from 'store/voting/slashing-proposals/selectors';

function ProposalsNav () {
  const dispatch = useDispatch();
  const appMode = useSelector(mode);

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector);
  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector);
  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector);
  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector);
  const contractUpdatesActiveProposalsCount = useSelector(contractUpdatesActiveProposalsCountSelector);

  useEffect(() => {
    if (appMode === MODE.basic) {
      dispatch(getQProposals());
      dispatch(getRootProposals());
    } else {
      dispatch(getQProposals());
      dispatch(getRootProposals());
      dispatch(getExpertProposals());
      dispatch(getSlashingProposals());
      dispatch(getContractUpdatesProposals());
    }
  }, [dispatch, appMode]);

  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <Link to="/governance/q-proposals">
        Q Proposals
      </Link>

      <Link to="/governance/q-root-node-panel">
        Root Node Panel
      </Link>

      {appMode === MODE.advanced && (
        <>
          <Link to="/governance/q-expert-proposals">
            Expert Proposals
          </Link>

          <Link to="/governance/slashing-proposals">
            Slashing Proposals
          </Link>

          <Link to="/governance/contract-updates">
            Contract Updates
          </Link>
        </>
      )}
    </div>
  );
}

export default ProposalsNav;
