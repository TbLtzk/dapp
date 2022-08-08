import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AuctionCompletedInfos, AuctionExecute, AuctionType, LiquidationAuctionExecute } from 'typings/auctions';

import { ShareButton } from 'components/ShareButton';
import { AUCTION_HEADERS } from 'pages/Auctions/Auctions';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import BidModal from './BidModal';
import { AuctionActionsContainer } from './styles';

import { executeAuction } from 'store/auctions/actions';

interface Props {
  auction: AuctionCompletedInfos;
  auctionType: AuctionType;
}

function AuctionActions ({ auction, auctionType }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen () {
    setModalOpen(true);
  }

  function handleModalClose () {
    setModalOpen(false);
  }

  function handleExecuteAuction () {
    dispatch(
      executeAuction(auctionType, {
        auctionId: (auction as AuctionExecute).auctionId,
        vaultId: (auction as LiquidationAuctionExecute).vaultId,
        vaultOwner: (auction as LiquidationAuctionExecute).vaultOwner,
      }, t('AUCTION_EXECUTION_SUCCESS'))
    );
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
      />
    </>
  );
}

export default AuctionActions;
