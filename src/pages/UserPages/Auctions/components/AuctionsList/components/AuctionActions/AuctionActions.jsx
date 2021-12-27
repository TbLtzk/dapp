import Button from 'components/Base/Buttons/Button'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { executeAuction } from 'store/auctions/action-creators'
import { setCreateObj } from 'store/modal-handler/action-creators'
import { setCreatedStepsLimit, setStepCounter } from 'store/voting/proposals/action-creators'
import ModalBid from '../../../CreateAuctionBtn/ModalBid'

function AuctionActions ({ auction }) {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [inf, setInf] = useState(null)

  function onAuctionBid (user, vaultId, contract, id) {
    setModalShow(true)
    setInf({
      user,
      vaultId,
      contract,
      id: id
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

  return auction.status === 'Active'
    ? (
        <div>
            <div className="list-card__line" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    disabled={auction.disableBidButton}
                    title="Bid"
                    icon="mdi mdi-shape-circle-plus btn-icon"
                    handleButton={onAuctionBid}
                />
                <div style={{ width: '20px' }} />
                <Button
                    disabled={auction.disableExecuteButton}
                    title="Execute"
                    icon="mdi mdi-play btn-icon"
                    handleButton={onAuctionExecute}
                />
            </div>
            <ModalBid
                inf={inf}
                auctionType={auction.contract}
                modalShow={modalShow}
                onHide={() => {
                  setModalShow(false)
                  dispatch(setCreateObj({}))
                  dispatch(setStepCounter(1))
                }}
            />
        </div>
      )
    : null
}

export default AuctionActions
