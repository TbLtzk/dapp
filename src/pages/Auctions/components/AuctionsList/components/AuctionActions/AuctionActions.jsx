import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import BidModal from '../BidModal';

import { executeAuction } from 'store/auctions/action-creators';

import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper';

const TOOLTIP_INFO = {
  bidPeriod: 'Bid period has ended.',
  executePeriod: 'Execute period not started or ended.'
};

function AuctionActions ({ auction }) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  function onOpenModal () {
    setModalShow(true);
  }

  function onHideModal () {
    setModalShow(false);
  }

  function onAuctionExecute () {
    dispatch(
      executeAuction({
        user: auction.user,
        vaultId: auction.vaultId,
        contract: auction.contract,
        id: auction.id
      })
    );
  }

  const auctionType = transformAuctionNameToAuctionType(auction.contract);

  const showActionButtons = auction.status === 'Executed' || auction.status === 'Closed';

  return !showActionButtons
    ? (
      <div>
        <div className="list-card__line" />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip disabled={!auction.disableBidButton} additionalInfo={TOOLTIP_INFO.bidPeriod}>
            <Button
              disabled={auction.disableBidButton}
              onClick={onOpenModal}
            >
              <i className="mdi mdi-shape-circle-plus" />
              <span>Bid</span>
            </Button>
          </Tooltip>

          <div style={{ width: '20px' }} />
          <Tooltip disabled={!auction.disableExecuteButton} additionalInfo={TOOLTIP_INFO.executePeriod}>
            <Button
              disabled={auction.disableExecuteButton}
              onClick={onAuctionExecute}
            >
              <i className="mdi mdi-play" />
              <span>Execute</span>
            </Button>
          </Tooltip>
        </div>
        <BidModal
          modalOpen={modalShow}
          type={auctionType}
          auction={auction}
          onHide={onHideModal}
        />
      </div>
    )
    : null;
}

export default AuctionActions;
