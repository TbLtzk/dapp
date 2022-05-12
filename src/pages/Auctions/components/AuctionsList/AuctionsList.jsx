import React, { useEffect, useState } from 'react';

import { concat, slice } from 'lodash';

import Button from 'components/Base/Button';
import { SkeletonAuctionLoading } from 'components/Base/SkeletonLoading';

import AuctionCard from './components/AuctionCard';

import { LoadingWrap } from 'constants/style';
import { fillArray } from 'func/useful';

const LOAD_TYPES = { load: 'load', empty: 'empty', error: 'error', loaded: 'loaded' };

function AuctionsList ({ auctions, loadingAuctions }) {
  const LIMIT = 9;
  const LENGTH = auctions?.length;

  const [state, setState] = useState(LOAD_TYPES.load);

  const [showMore, setShowMore] = useState(false);
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(LIMIT);

  const handleNextAuctions = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < LENGTH - 1;
    const newList = concat(list, slice(auctions, index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

  const handleGetAuctions = () => {
    if (!auctions?.length && !loadingAuctions) {
      setState(LOAD_TYPES.empty);
    }
    if (auctions?.length) {
      setList(slice(auctions, 0, index));
      setState(LOAD_TYPES.loaded);
      if (auctions.length > LIMIT) {
        setShowMore(true);
      }
    }
  };

  useEffect(() => {
    handleGetAuctions();
  }, [loadingAuctions, auctions]);

  switch (state) {
    case LOAD_TYPES.empty:
      return <p>No Auctions</p>;
    case LOAD_TYPES.loaded: {
      return (
        <div>
          {list.map((auction, i) => (
            <AuctionCard
              key={auction.id + auction.contract + auction.user}
              auction={auction}
              id={auction.id + auction.contract}
            />
          ))}
          {showMore
            ? (
              <LoadingWrap>
                <Button
                  alwaysEnabled
                  margin="0 0 5% 0"
                  width="140px"
                  title="Show more"
                  handleButton={handleNextAuctions}
                />
              </LoadingWrap>
            )
            : null}
        </div>
      );
    }
    default:
      return (
        <div>
          {fillArray(5).map((id) => (
            <SkeletonAuctionLoading key={id} />
          ))}
        </div>
      );
  }
}

export default AuctionsList;
