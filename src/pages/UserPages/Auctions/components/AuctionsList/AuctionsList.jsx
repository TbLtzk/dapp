import React, { useState } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import CardBody from './components/CardBody'

import { LoadingWrap } from 'constants/style'

import { useDispatch } from 'react-redux'

import Status from './components/Status'
import ModalBid from '../CreateAuctionBtn/ModalBid'
import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import { executeAuction } from 'store/actions/action-creaters/auctions/auctions'
import {
  setCreatedStepsLimit,
  setCreateObj,
  setStepCounter
} from 'store/actions/action-creaters/auctions/modalHandler'
import CardDropdownItems from './components/CardDropdownItems'
import ListCard from 'components/Custom/PageLists/ListCard'

function AuctionsList (props) {
  const { auctions, loading, errorMessage, activeTab } = props
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [inf, setInf] = useState(null)

  const onAuctionBid = (user, vaultId, contract, id, bid) => {
    setInf({
      user,
      vaultId,
      contract,
      id: id
    })
    dispatch(setStepCounter(1))
    dispatch(setCreatedStepsLimit(2))
    setModalShow(true)
    dispatch(setCreateObj({ first: activeTab }))
  }

  const onAuctionExecute = (user, vaultId, contract, id) => {
    dispatch(
      executeAuction({
        user,
        vaultId,
        contract,
        id: id
      })
    )
  }

  return (
        <>
            {loading
              ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
                )
              : errorMessage
                ? (
                <p>No auctions</p>
                  )
                : auctions.length === 0
                  ? (
                <p>No auctions</p>
                    )
                  : (
                <div>
                    {auctions.map((auction, i) => {
                      return (
                            <ListCard
                                key={auction?.contract === 'SystemSurplusAuction' ? auction.id : i + auction?.contract}
                                id={auction?.contract === 'SystemSurplusAuction' ? auction.id : i + auction?.contract}
                                headerLeftSide={
                                    <>
                                        <h1>{auction?.title}</h1>
                                        <Status auction={auction} />
                                    </>
                                }
                                dropdownItems={
                                    <CardDropdownItems
                                        auction={auction}
                                        handleExecute={() => {
                                          onAuctionExecute(
                                            auction.user,
                                            auction.userVaultId,
                                            auction.contract,
                                            auction?.id
                                          )
                                        }}
                                        handleBid={() => {
                                          onAuctionBid(
                                            auction.user,
                                            auction.userVaultId,
                                            auction.contract,
                                            auction?.id
                                          )
                                        }}
                                        shareText={`${window.location.origin}/q-governance/proposal/${auction.contract}/${auction.id}`}
                                    />
                                }
                                collapsedContent={<CardBody data={auction} />}
                                content={
                                    <div className="list-card__three-colm">
                                        <div>
                                            <h5>Bid until</h5>
                                            <p>{convertToMonthDayYear(auction.endTime)}</p>
                                        </div>
                                        <div>
                                            <h5>Remaining time for bid</h5>
                                            <p>{remainDate(auction.endTime)}</p>
                                        </div>
                                        <div>
                                            {auction.contract === 'LiquidationAuction'
                                              ? (
                                                <>
                                                    <h5>Vault owner</h5>
                                                    <p>{auction.user}</p>
                                                </>
                                                )
                                              : (
                                                <>
                                                    <h5>Auction id</h5>
                                                    <p>{auction.id}</p>
                                                </>
                                                )}
                                        </div>
                                    </div>
                                }
                            />
                      )
                    })}
                </div>
                    )}
            <ModalBid
                inf={inf}
                activeTab={activeTab}
                modalShow={modalShow}
                onHide={() => {
                  setModalShow(false)
                  dispatch(setCreateObj({}))
                  dispatch(setStepCounter(1))
                }}
            />
        </>
  )
}

export default AuctionsList
