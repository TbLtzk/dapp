import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Illustration } from '@q-dev/q-ui-kit';
import { fillArray } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';
import { DAOProposal, ProposalFilterStatus } from 'typings/proposals';

import Button from 'components/Button';
import ProposalCardSkeleton from 'pages/Governance/components/ProposalCardSkeleton';

import { useDAOSubgraph } from 'hooks/useDAOSubgraph';

import DAOProposalCard from '../DAOProposalCard';

import { ListEmptyStub, ListNextContainer, ListWrapper } from './styles';

import { dateToUnix } from 'utils/date';

const PAGE_LIMIT = 10;

function DAOProposalsList ({ status }: { status: ProposalFilterStatus }) {
  const { t } = useTranslation();

  const { getDaoProposals } = useDAOSubgraph();
  const timestamp = useRef(dateToUnix());

  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isProposalsFetched, setIsProposalsFetched] = useState(false);

  useEffect(() => {
    firstLoadProposals();
  }, [status]);

  async function firstLoadProposals () {
    setIsLoading(true);
    setProposals([]);
    timestamp.current = dateToUnix();
    try {
      const proposals = await getDaoProposals({
        timestamp: timestamp.current,
        status: status,
        pageSize: PAGE_LIMIT,
      });
      setProposals(proposals);
      setIsProposalsFetched(proposals.length < PAGE_LIMIT);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
    setIsLoading(false);
  }

  async function handleNextProposals () {
    setIsLoadingMore(true);
    try {
      const newProposals = await getDaoProposals({
        timestamp: timestamp.current,
        status: status,
        pageSize: PAGE_LIMIT,
        skipSize: proposals.length
      });
      setProposals((oldProposals) => oldProposals.concat(newProposals));
      setIsProposalsFetched(newProposals.length < PAGE_LIMIT);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
    setIsLoadingMore(false);
  };

  if (isLoading) {
    return (
      <ListWrapper>
        {fillArray(10).map((id) => (
          <ProposalCardSkeleton key={id} />
        ))}
      </ListWrapper>
    );
  }

  if (proposals.length === 0) {
    return (
      <ListEmptyStub>
        <Illustration type="empty-list" />
        <p className="text-lg font-semibold">{t('NO_PROPOSALS_FOUND')}</p>
      </ListEmptyStub>
    );
  }

  return (
    <>
      <ListWrapper>
        {proposals.map((proposal, index) => (
          <DAOProposalCard key={proposal.id + index} proposal={proposal} />
        ))}
      </ListWrapper>

      {!isProposalsFetched && (
        <ListNextContainer>
          <Button
            alwaysEnabled
            disabled={isLoadingMore}
            onClick={handleNextProposals}
          >
            {t('SHOW_MORE')}
          </Button>
        </ListNextContainer>
      )}
    </>
  );
}

export default DAOProposalsList;
