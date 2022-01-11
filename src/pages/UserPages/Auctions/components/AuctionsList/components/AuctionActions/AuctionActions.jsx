import Button from 'components/Base/Buttons/Button'
import Tooltip from 'components/Base/Tooltip'
import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { executeAuction } from 'store/auctions/action-creators'
import { setCreateObj } from 'store/modal-handler/action-creators'
import { setCreatedStepsLimit, setStepCounter } from 'store/voting/proposals/action-creators'
import ModalBid from '../../../CreateAuctionBtn/ModalBid'

const TOOLTIP_INFO = {
  bidPeriod: 'Bid period has ended.',
  executePeriod: 'Execute period not started or ended.'
}

function AuctionActions ({ auction }) {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [inf, setInf] = useState(null)

  function onAuctionBid () {
    setModalShow(true)
    setInf({
      user: auction.user,
      vaultId: auction.vaultId,
      contract: auction.contract,
      id: auction.id
    })
    dispatch(setStepCounter(1))
    dispatch(setCreatedStepsLimit(2))
    dispatch(setCreateObj({ first: auction.contract }))
  }

  function onAuctionExecute () {
    dispatch(
      executeAuction({
        user: auction.user,
        vaultId: auction.vaultId,
        contract: auction.contract,
        id: auction.id
      })
    )
  }

  const auctionType = transformAuctionNameToAuctionType(auction.contract)

  const showActionButtons = auction.status === 'Executed' || auction.status === 'Closed'

  return !showActionButtons
    ? (
        <div>
            <div className="list-card__line" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip disabled={!auction.disableBidButton} additionalInfo={TOOLTIP_INFO.bidPeriod}>
                    <Button
                        disabled={auction.disableBidButton}
                        title="Bid"
                        icon="mdi mdi-shape-circle-plus btn-icon"
                        handleButton={onAuctionBid}
                    />
                </Tooltip>

                <div style={{ width: '20px' }} />
                <Tooltip disabled={!auction.disableExecuteButton} additionalInfo={TOOLTIP_INFO.executePeriod}>
                    <Button
                        disabled={auction.disableExecuteButton}
                        title="Execute"
                        icon="mdi mdi-play btn-icon"
                        handleButton={onAuctionExecute}
                    />
                </Tooltip>
            </div>
            {!inf
              ? null
              : (
                <ModalBid
                    inf={inf}
                    activeTab={auctionType}
                    modalShow={modalShow}
                    onHide={() => {
                      setModalShow(false)
                      dispatch(setCreateObj({}))
                      dispatch(setStepCounter(1))
                    }}
                />
                )}
        </div>
      )
    : null
}

export default AuctionActions
