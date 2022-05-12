import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import ModalBid from '../../../CreateAuctionBtn/ModalBid';

import { executeAuction } from 'store/auctions/action-creators';
import { setCreateObj } from 'store/modal-handler/action-creators';
import { setCreatedStepsLimit, setStepCounter } from 'store/voting/proposals/action-creators';

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
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    dispatch(setCreateObj({ first: auction.contract }));
  }

  function onHideModal () {
    setModalShow(false);
    dispatch(setCreateObj({}));
    dispatch(setStepCounter(1));
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
        <ModalBid
          inf={auction}
          activeTab={auctionType}
          modalShow={modalShow}
          onHide={onHideModal}
        />
      </div>
    )
    : null;
}

export default AuctionActions;
