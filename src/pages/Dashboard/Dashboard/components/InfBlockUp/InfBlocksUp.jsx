import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CopyToClipboard from 'components/Base/CopyToClipboard';
import CustomBlock from 'components/Base/CustomBlock';
import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { mode } from 'store/dashboard-mode/selectors';
import {
  contractUpdatesActiveProposalsCountSelector,
  contractUpdatesEndedProposalsCountSelector,
  contractUpdatesLoadingProposalsCountSelector
} from 'store/voting/contract-updates/selectors';
import {
  expertActiveProposalsCountSelector,
  expertEndedProposalsCountSelector,
  expertLoadingProposalsCountSelector
} from 'store/voting/expert-proposals/selectors';
import { getConstitutionHash } from 'store/voting/proposals/action-creators';
import { constitutionHash } from 'store/voting/proposals/selectors';
import {
  qActiveProposalsCountSelector,
  qEndedProposalsCountSelector,
  qLoadingProposalsCountSelector
} from 'store/voting/q-proposals/selectors';
import {
  rootActiveProposalsCountSelector,
  rootEndedProposalsCountSelector,
  rootLoadingProposalsCountSelector
} from 'store/voting/root-node-proposals/selectors';
import {
  slashingActiveProposalsCountSelector,
  slashingEndedProposalsCountSelector,
  slashingLoadingProposalsCountSelector
} from 'store/voting/slashing-proposals/selectors';

import { contractRegistryInstance } from 'contracts/contract-instance';

import { archiveConstitution, latestConstitution } from 'constants/constitution';
import { fetchBlockNumber } from 'func/useful';

function InfBlocksUp () {
  const appMode = useSelector(mode);
  const [contractRegistryAddress, setContractRegistryAddress] = useState('0x00');

  const [blockNumber, setBlockNumber] = useState('0');

  const dispatch = useDispatch();
  const constitutionHashShow = useSelector(constitutionHash);

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

  useEffect(() => {
    dispatch(getConstitutionHash());
    setContractRegistryAddress(contractRegistryInstance.address);
    fetchBlockNumber('latest').then((blockNumber) => setBlockNumber(blockNumber));
  }, [dispatch]);

  return (
    <>
      <CustomBlock>
        <h1>Blockchain</h1>
        <h5>Block Height:</h5>
        <p> {blockNumber}</p>
        <h5>System Contract Registry:</h5>
        <ExplorerAddress address={contractRegistryAddress} />
      </CustomBlock>

      <CustomBlock title="Constitution">
        <h1>Constitution</h1>
        <h5>Hash:</h5>
        <CopyToClipboard value={constitutionHashShow}>
          <p className="card__hash">{constitutionHashShow}</p>
        </CopyToClipboard>

        <div className="card__actions">
          <a
            href={latestConstitution}
            target="_blank"
            rel="noreferrer"
          >
            <Button alwaysEnabled>
              <i className="mdi mdi-download" />
              <span>Download Latest</span>
            </Button>
          </a>
          <a
            href={archiveConstitution}
            target="_blank"
            rel="noreferrer"
          >
            <Button alwaysEnabled>
              <i className="mdi mdi-archive-outline" />
              <span>Check Archive</span>
            </Button>
          </a>
        </div>
      </CustomBlock>

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
        <Link to="/q-governance">
          <Button
            alwaysEnabled
            look="white"
          >
            <i className="mdi mdi-arrow-right" />
            <span>Go to Governance</span>
          </Button>
        </Link>
      </CustomBlock>
    </>
  );
}

export default InfBlocksUp;
