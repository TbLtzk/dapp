import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { concat } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import Button from 'components/Base/Button';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import { ProposalFilterStatus } from '../types';

import ListCard from './ListCard';

import { activeProposalsByTypeSelector, endedProposalsByTypeSelector, proposalsByTypeSelector } from 'store/voting/proposals/selectors';

import { ProposalType } from 'constants/statuses';
import { LoadingWrap } from 'constants/style';
import { fillArray } from 'func/useful';

const PAGE_LIMIT = 10;

function ProposalsList ({ type, status }: { type: ProposalType, status: ProposalFilterStatus }) {
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
    const newList = concat(list, filteredProposals.slice(newOffset, PAGE_LIMIT));
    setOffset(offset);
    setList(newList);
  };

  function getFilteredProposals () {
    switch (status) {
      case 'active':
        return activeProposals;
      case 'ended':
        return endedProposals;
      default:
        return proposals;
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {fillArray(10).map((id) => (
          <SkeletonProposalsLoading key={id} />
        ))}
      </div>
    );
  }

  if (list.length === 0) {
    return <p>No proposals</p>;
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {list.map((proposal: any) => (
          <ListCard
            key={proposal.id + proposal?.contract}
            proposal={proposal}
          />
        ))}
      </div>

      {filteredProposals.length > list.length && (
        <LoadingWrap>
          <Button
            style={{
              margin: '15px auto',
              width: '140px'
            }}
            onClick={handleNextProposals}
          >
            Show more
          </Button>
        </LoadingWrap>
      )}
    </>
  );
}

export default ProposalsList;
