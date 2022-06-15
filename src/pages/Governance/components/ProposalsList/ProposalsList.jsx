import { useEffect, useState } from 'react';

import { concat, slice } from 'lodash';

import Button from 'components/Base/Button';
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ListCard from './components/ListCard';

import { LoadingWrap } from 'constants/style';
import { fillArray } from 'func/useful';

const LIMIT = 9;
const LOAD_TYPES = { load: 'load', empty: 'empty', loaded: 'loaded' };

function ProposalsList ({ proposals, proposalsKind, proposalsCount }) {
  const [state, setState] = useState(LOAD_TYPES.load);
  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(LIMIT);

  const LENGTH = proposals.length;

  const handleNextProposals = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < LENGTH - 1;
    const newList = concat(list, slice(proposals, index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

  useEffect(() => {
    checkProposals();
    return () => {
      setState(LOAD_TYPES.load);
    };
  }, [proposals, proposalsCount]);

  const checkProposals = () => {
    if (LENGTH > LIMIT) {
      setShowMore(true);
    }
    if (LENGTH) {
      setList(slice(proposals, 0, index));
      setState(LOAD_TYPES.loaded);
    } else if (!proposalsCount) {
      setState(LOAD_TYPES.empty);
    }
  };

  switch (state) {
    case LOAD_TYPES.empty:
      return <p>No proposals</p>;
    case LOAD_TYPES.loaded:
      return (
        <div>
          {list.map((proposal) => (
            <ListCard
              key={proposal.id + proposal?.contract}
              id={proposal.id + proposal?.contract}
              proposal={proposal}
              onePage={true}
              proposalsKind={proposalsKind}
            />
          ))}
          {showMore
            ? (
              <LoadingWrap>
                <Button
                  style={{
                    margin: '0 0 5% 0',
                    width: '140px'
                  }}
                  onClick={handleNextProposals}
                >
                  Show more
                </Button>
              </LoadingWrap>
            )
            : null}
        </div>
      );
    case LOAD_TYPES.load:
    default:
      return (
        <div>
          {fillArray(9).map((id) => (
            <SkeletonProposalsLoading key={id} />
          ))}
        </div>
      );
  }
}

export default ProposalsList;
