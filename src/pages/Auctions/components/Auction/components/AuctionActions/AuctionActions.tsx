import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AuctionCompletedInfos, AuctionExecute, AuctionType, LiquidationAuctionExecute } from 'typings/auctions';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tooltip from 'ui/Tooltip';

import useCopyToClipboard from 'hooks/useCopyToClipboard';

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

  const [copied, copy] = useCopyToClipboard();

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
      })
    );
  }

  const isBidTime = auction.isBidTime;
  const isAuctionEnded = auction.isAuctionEnded;

  return (
    <>
      <AuctionActionsContainer>
        <Tooltip
          trigger={
            <Button
              alwaysEnabled
              className="auction-button"
              look="secondary"
              onClick={() => copy(window.location.href)}
            >
              <i className="mdi mdi-share-variant-outline" />
              Share
            </Button>
          }
        >
          {copied ? t('COPIED') : t('COPY')}
        </Tooltip>

        {!isAuctionEnded
          ? (
            isBidTime
              ? (
                <Button className="auction-button" onClick={handleModalOpen}>
                  <Icon name="hammer"/>
                  <span>{t('BID')}</span>
                </Button>
              )
              : (
                <Button className="auction-button" onClick={handleExecuteAuction}>
                  <Icon name="cross"/>
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
