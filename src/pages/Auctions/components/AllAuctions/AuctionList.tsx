import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuctionInfos, AuctionType } from 'typings/auctions';
import Button from 'ui/Button';

import { EmptyList, ListWrapper } from 'pages/Auctions/styles';
import ProposalCardSkeleton from 'pages/Governance/components/ProposalCardSkeleton';
import { ListNextContainer } from 'pages/Governance/components/ProposalsList/styles';

import AuctionCard from './components/AuctionCard';

import { getAuctions } from 'store/auctions/actions';
import { auctionsByTypeSelector } from 'store/auctions/selectors';

import { fillArray } from 'func/useful';

const PAGE_LIMIT = 10;

function AllAuctions ({ auctionType }: { auctionType: AuctionType }) {
  const dispatch = useDispatch();

  const { auctions, isLoading } = useSelector(auctionsByTypeSelector(auctionType));

  const [list, setList] = useState<AuctionInfos[]>([]);
  const [offset, setOffset] = useState(PAGE_LIMIT);

  useEffect(() => {
    dispatch(getAuctions(auctionType));
  }, [dispatch]);

  useEffect(() => {
    setOffset(PAGE_LIMIT);
    setList(auctions.slice(0, PAGE_LIMIT));
  }, [auctions]);

  const handleNextAuctions = () => {
    const newOffset = offset + PAGE_LIMIT;
    const newList = list.concat(auctions.slice(offset, newOffset));
    setOffset((offset) => offset + PAGE_LIMIT);
    setList(newList);
  };

  if (isLoading) {
    return (
      <ListWrapper>
        {fillArray(6).map((id) => (
          <ProposalCardSkeleton key={id} />
        ))}
      </ListWrapper>
    );
  }

  if (!auctions.length) {
    return <EmptyList className="text-xl font-semibold">No auctions found</EmptyList>;
  }

  return (
    <>
      <ListWrapper>
        {list.map((auction: AuctionInfos) => (
          <AuctionCard key={auction.slug} auction={auction} />
        ))}
      </ListWrapper>
      {list.length < auctions.length && (
        <ListNextContainer>
          <Button onClick={handleNextAuctions}>Show more</Button>
        </ListNextContainer>
      )}
    </>
  );
}

export default AllAuctions;
