import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Illustration } from '@q-dev/q-ui-kit';
import { fillArray } from '@q-dev/utils';
import { AuctionInfos, AuctionType } from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';
import { ListEmptyStub, ListWrapper } from 'pages/Auctions/styles';
import ProposalCardSkeleton from 'pages/Governance/components/ProposalCardSkeleton';
import { ListNextContainer } from 'pages/Governance/components/Proposals/components/ProposalsList/styles';

import AuctionCard from './components/AuctionCard';

import { useAuctions } from 'store/auctions/hooks';

interface Props {
  auctionType: AuctionType;
  stablecoinAsset: StablecoinAsset;
}

const PAGE_LIMIT = 10;

function AllAuctions ({ auctionType, stablecoinAsset }: Props) {
  const { t } = useTranslation();

  const { auctions, getAuctions } = useAuctions();
  const { list: auctionsList, isLoading } = auctions[stablecoinAsset][auctionType];

  const [list, setList] = useState<AuctionInfos[]>([]);
  const [offset, setOffset] = useState(PAGE_LIMIT);

  useEffect(() => {
    getAuctions(auctionType, stablecoinAsset);
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
          <AuctionCard
            key={auction.slug}
            auction={auction}
            stablecoinAsset={stablecoinAsset}
          />
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
