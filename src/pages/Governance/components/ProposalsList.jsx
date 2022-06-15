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
const LOAD_TYPES = { load: 'load', empty: 'empty', loaded: 'loaded' };

function ProposalsList ({ type }) {
  const proposals = useSelector(qEndedProposalsSelector);
  const proposalsCount = useSelector(qEndedProposalsCountSelector);

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
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {list.map((proposal) => (
              <ListCard
                key={proposal.id + proposal?.contract}
                id={proposal.id + proposal?.contract}
                proposal={proposal}
                proposalsKind={type}
              />
            ))}
          </div>
          {showMore
            ? (
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
            )
            : null}
        </>
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
