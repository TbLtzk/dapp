import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuctionInfos, AuctionType } from 'typings/auctions';

import { ListEmptyStub, ListWrapper } from 'pages/Auctions/styles';
import ProposalCardSkeleton from 'pages/Governance/components/Proposals/components/ProposalCardSkeleton';
import { ListNextContainer } from 'pages/Governance/components/Proposals/components/ProposalsList/styles';
import Button from 'ui/Button';
import Illustration from 'ui/Illustration';

import AuctionCard from './components/AuctionCard';

import { useAuctions } from 'store/auctions/hooks';

import { fillArray } from 'utils/arrays';

const PAGE_LIMIT = 10;

function AllAuctions ({ auctionType }: { auctionType: AuctionType }) {
  const { t } = useTranslation();

  const { auctions, getAuctions } = useAuctions();
  const { list: auctionsList, isLoading } = auctions[auctionType];

  const [list, setList] = useState<AuctionInfos[]>([]);
  const [offset, setOffset] = useState(PAGE_LIMIT);

  useEffect(() => {
    getAuctions(auctionType);
  }, []);

  useEffect(() => {
    setOffset(PAGE_LIMIT);
    setList(auctionsList.slice(0, PAGE_LIMIT));
  }, [auctions]);

  const handleNextAuctions = () => {
    const newOffset = offset + PAGE_LIMIT;
    const newList = list.concat(auctionsList.slice(offset, newOffset));
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

  if (!auctionsList.length) {
    return (
      <ListEmptyStub>
        <Illustration type="empty-list" />
        <p className="text-lg font-semibold">{t('NO_AUCTIONS_FOUND')}</p>
      </ListEmptyStub>
    );
  }

  return (
    <>
      <ListWrapper>
        {list.map((auction: AuctionInfos) => (
          <AuctionCard key={auction.slug} auction={auction} />
        ))}
      </ListWrapper>
      {list.length < auctionsList.length && (
        <ListNextContainer>
          <Button onClick={handleNextAuctions}>{t('SHOW_MORE')}</Button>
        </ListNextContainer>
      )}
    </>
  );
}

export default AllAuctions;
