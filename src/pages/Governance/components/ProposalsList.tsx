import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { concat, slice } from 'lodash';

import Button from 'components/Base/Button';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ListCard from './ListCard';

import { qProposalsLoadingSelector, qProposalsSelector } from 'store/voting/q-proposals/selectors';

import { LoadingWrap } from 'constants/style';
import { fillArray } from 'func/useful';

const LIMIT = 10;

function ProposalsList () {
  const proposals = useSelector(qProposalsSelector);
  const isLoading = useSelector(qProposalsLoadingSelector);

  const [list, setList] = useState<any>([]);
  const [index, setIndex] = useState(LIMIT);

  const handleNextProposals = () => {
    const newIndex = index + LIMIT;
    const newList = concat(list, slice(proposals, index, newIndex));
    setIndex(newIndex);
    setList(newList);
  };

  useEffect(() => {
    if (proposals.length) {
      setList(slice(proposals, 0, index));
    }
  }, [proposals]);

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
      {proposals.length > list.length && (
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
