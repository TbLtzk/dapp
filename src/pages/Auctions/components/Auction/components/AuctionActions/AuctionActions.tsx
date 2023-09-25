import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@q-dev/q-ui-kit';
import { AuctionCompletedInfos, AuctionExecute, AuctionType, LiquidationAuctionExecute } from 'typings/auctions';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';
import { ShareButton } from 'components/ShareButton';

import BidModal from './BidModal';
import { AuctionActionsContainer } from './styles';

import { useAuctions } from 'store/auctions/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { AUCTION_HEADERS } from 'constants/auctions';

interface Props {
  auction: AuctionCompletedInfos;
  auctionType: AuctionType;
  stablecoinAsset: StablecoinAsset;
  onSubmit: () => void;
}

function AuctionActions ({ auction, auctionType, stablecoinAsset, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { executeAuction } = useAuctions();

  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen () {
    setModalOpen(true);
  }

  function handleModalClose () {
    setModalOpen(false);
  }

  function handleExecuteAuction () {
    submitTransaction({
      successMessage: t('AUCTION_EXECUTION_TX'),
      onSuccess: () => onSubmit(),
      submitFn: () => executeAuction({
        auctionType,
        asset: stablecoinAsset,
        form: {
          auctionId: (auction as AuctionExecute).auctionId,
          vaultId: (auction as LiquidationAuctionExecute).vaultId,
          vaultOwner: (auction as LiquidationAuctionExecute).vaultOwner,
        },
      })
    });
  }

  const isBidTime = auction.isBidTime;
  const isAuctionEnded = auction.isAuctionEnded;
  const auctionId = auction.auctionType === 'liquidation' ? auction.vaultId : auction.auctionId;

  return (
    <>
      <AuctionActionsContainer>
        <ShareButton
          className="auction-button"
          title={`#${auctionId} ${AUCTION_HEADERS[auctionType]}`}
          url={window.location.href}
        />

        {!isAuctionEnded
          ? (
            isBidTime
              ? (
                <Button className="auction-button" onClick={handleModalOpen}>
                  <Icon name="hammer" />
                  <span>{t('BID')}</span>
                </Button>
              )
              : (
                <Button className="auction-button" onClick={handleExecuteAuction}>
                  <Icon name="cross" />
                  <span>{t('EXECUTE')}</span>
                </Button>
              )
          )
          : null}
      </AuctionActionsContainer>
      <BidModal
        modalOpen={modalOpen}
        auction={auction}
        stablecoinAsset={stablecoinAsset}
        onHide={handleModalClose}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default AuctionActions;
