import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router';

import { Icon } from '@q-dev/q-ui-kit';
import { useInterval } from '@q-dev/react-hooks';
import axios from 'axios';
import { utils } from 'ethers';
import { ErrorHandler } from 'helpers';
import { DAOProposal } from 'typings/proposals';

import Button from 'components/Button';

import { useDAOSubgraph } from 'hooks/useDAOSubgraph';

import DAOProposalLayout from './components/DAOProposalLayout';
import ProposalSkeleton from './components/ProposalSkeleton';

import { useTransaction } from 'store/transaction/hooks';

import { RoutePaths } from 'constants/routes';

const axiosInstance = axios.create();

async function getExternalABI (url: string): Promise<string[] | null> {
  if (!url) return null;
  try {
    const { data } = await axiosInstance.get(url);
    const abiInterface = new utils.Interface(data.abi);
    return abiInterface.format(utils.FormatTypes.full) as string[];
  } catch (e) {
    ErrorHandler.processWithoutFeedback(e);
    return null;
  }
}

function DAOProposalPage ({ match }: RouteComponentProps<{ id: string }>) {
  const { t } = useTranslation();
  const history = useHistory();
  const { pendingTransactions } = useTransaction();
  const { getDaoProposalById } = useDAOSubgraph();
  const [proposal, setProposal] = useState<DAOProposal |null>(null);
  const [abi, setAbi] = useState<string[] | null>(null);

  async function loadProposal () {
    try {
      const proposal = await getDaoProposalById(match.params.id);

      if (!proposal) history.replace('/not-found');

      const abi = await getExternalABI(proposal.abiExternalLink);
      setAbi(abi);
      setProposal(proposal);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      history.replace('/not-found');
    }
  }

  useInterval(loadProposal, 60_000);
  useEffect(() => {
    if (!pendingTransactions.length) {
      setProposal(null);
      loadProposal();
    }
  }, [pendingTransactions.length]);

  const handleBackClick = () => {
    history.replace(RoutePaths.daoProposals);
  };

  return (
    <div className="proposal">
      <Button
        alwaysEnabled
        look="ghost"
        style={{ marginBottom: '24px' }}
        onClick={handleBackClick}
      >
        <Icon name="arrow-left" />
        <span>{t('DAO_APPEALS')}</span>
      </Button>

      {proposal
        ? <DAOProposalLayout proposal={proposal} abi={abi} />
        : <ProposalSkeleton />
      }
    </div>
  );
}

export default DAOProposalPage;
