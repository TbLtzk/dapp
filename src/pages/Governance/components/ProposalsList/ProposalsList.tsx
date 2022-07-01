import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ProposalEvent } from 'typings/contracts';
import { ProposalFilterStatus, ProposalType } from 'typings/proposals';
import Button from 'ui/Button';

import ProposalCard from '../ProposalCard';
import ProposalCardSkeleton from '../ProposalCardSkeleton';

import { ListEmptyMessage, ListNextContainer, ListWrapper } from './styles';

import {
  activeProposalsByTypeSelector,
  endedProposalsByTypeSelector,
  proposalsByTypeSelector,
} from 'store/voting/proposals/selectors';

import { fillArray } from 'func/useful';

const PAGE_LIMIT = 10;

function ProposalsList({ type, status }: { type: ProposalType; status: ProposalFilterStatus }) {
  const { proposals, isLoading } = useSelector(proposalsByTypeSelector(type));
  const activeProposals = useSelector(activeProposalsByTypeSelector(type));
  const endedProposals = useSelector(endedProposalsByTypeSelector(type));
  const filteredProposals = getFilteredProposals();

  const [list, setList] = useState<ProposalEvent[]>([]);
  const [offset, setOffset] = useState(PAGE_LIMIT);

  useEffect(() => {
    setOffset(PAGE_LIMIT);
    setList(filteredProposals.slice(0, PAGE_LIMIT));
  }, [status, proposals]);

  const handleNextProposals = () => {
    const newOffset = offset + PAGE_LIMIT;
    const newList = list.concat(filteredProposals.slice(offset, newOffset));
    setOffset((offset) => offset + PAGE_LIMIT);
    setList(newList);
  };

  function getFilteredProposals() {
    switch (status) {
      case 'active':
        return activeProposals;
      case 'ended':
        return endedProposals;
      default:
        return proposals;
    }
  }

  if (isLoading) {
    return (
      <ListWrapper>
        {fillArray(10).map((id) => (
          <ProposalCardSkeleton key={id} />
        ))}
      </ListWrapper>
    );
  }

  if (list.length === 0) {
    return <ListEmptyMessage className="text-xl font-semibold">No proposals found</ListEmptyMessage>;
  }

  return (
    <>
      <ListWrapper>
        {list.map((proposal: any) => (
          <ProposalCard key={proposal.id + proposal?.contract} proposal={proposal} />
        ))}
      </ListWrapper>

      {filteredProposals.length > list.length && (
        <ListNextContainer>
          <Button onClick={handleNextProposals}>Show more</Button>
        </ListNextContainer>
      )}
    </>
  );
}

export default ProposalsList;
