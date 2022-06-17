import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { concat, slice } from 'lodash';

import Button from 'components/Base/Button';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ListCard from './ListCard';

import { qEndedProposalsCountSelector, qEndedProposalsSelector } from 'store/voting/q-proposals/selectors';

import { LoadingWrap } from 'constants/style';
import { fillArray } from 'func/useful';

const LIMIT = 10;

function ProposalsList () {
  const proposals = useSelector(qEndedProposalsSelector);
  const proposalsCount = useSelector(qEndedProposalsCountSelector);

  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState<any>([]);
  const [index, setIndex] = useState(LIMIT);

  const handleNextProposals = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < proposals.length - 1;
    const newList = concat(list, slice(proposals, index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

  useEffect(() => {
    checkProposals();
    return () => {
      setIsLoading(false);
    };
  }, [proposals, proposalsCount]);

  const checkProposals = () => {
    if (proposals.length > LIMIT) {
      setShowMore(true);
    }

    if (proposals.length) {
      setList(slice(proposals, 0, index));
      setIsLoading(false);
    } else if (!proposalsCount) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {fillArray(9).map((id) => (
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
      {showMore && (
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
