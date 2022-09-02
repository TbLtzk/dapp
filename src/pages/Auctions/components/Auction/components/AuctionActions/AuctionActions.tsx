import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuctionCompletedInfos, AuctionExecute, AuctionType, LiquidationAuctionExecute } from 'typings/auctions';

import { ShareButton } from 'components/ShareButton';
import { AUCTION_HEADERS } from 'pages/Auctions/Auctions';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import BidModal from './BidModal';
import { AuctionActionsContainer } from './styles';

import { useAuctions } from 'store/auctions/hooks';
import { useTransaction } from 'store/transaction/hooks';

interface Props {
  auction: AuctionCompletedInfos;
  auctionType: AuctionType;
  onSubmit: () => void;
}

function AuctionActions ({ auction, auctionType, onSubmit }: Props) {
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
      successMessage: t('AUCTION_EXECUTION_SUCCESS'),
      onSuccess: () => onSubmit(),
      submitFn: () => executeAuction({
        auctionType,
        form: {
          auctionId: (auction as AuctionExecute).auctionId,
          vaultId: (auction as LiquidationAuctionExecute).vaultId,
          vaultOwner: (auction as LiquidationAuctionExecute).vaultOwner,
        }
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
        onHide={handleModalClose}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default AuctionActions;
