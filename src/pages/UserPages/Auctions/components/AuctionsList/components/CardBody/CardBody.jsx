import { CONTRACTS_NAMES } from 'constants/contracts'
import { AuctionCardBodyContainer } from 'pages/UserPages/Auctions/styles'
import React from 'react'

import { useSelector } from 'react-redux'
import { symbol } from 'store/stable-coin/selectors'
import AuctionActions from '../AuctionActions'

function CardBody ({ auction }) {
  const symbolType = useSelector(symbol)
  const getSymbol = auction.contract === CONTRACTS_NAMES.systemSurplusAuction ? ' Q' : ' ' + symbolType
  return (
        <AuctionCardBodyContainer>
            <div className="auction-card_elements">
                <div>
                    <h5>Highest Bid</h5>
                    <p>
                        {auction.highestBid}
                        {getSymbol}
                    </p>

                    {auction.raisingBid
                      ? (
                        <>
                            <h5>Minimum Bid</h5>
                            <p>
                                {auction.raisingBid}
                                {getSymbol}
                            </p>
                        </>
                        )
                      : null}
                </div>
                <div>
                    {auction.contract === CONTRACTS_NAMES.systemDebtAuction
                      ? (
                        <>
                            <h5>Reserve Lot</h5>
                            <p>{auction.reserveLot} Q</p>
                        </>
                        )
                      : null}
                    {auction.contract === CONTRACTS_NAMES.liquidationAuction
                      ? (
                        <>
                            <h5>Auctioned Collateral</h5>
                            <p>{`${auction.colAsset} ${auction.colKey}`}</p>
                        </>
                        )
                      : null}
                    {auction.contract === CONTRACTS_NAMES.systemSurplusAuction
                      ? (
                        <>
                            <h5>Auction Initiated by</h5>
                            <p>{auction.user}</p>
                        </>
                        )
                      : null}
                    {auction.contract === CONTRACTS_NAMES.liquidationAuction
                      ? (
                        <>
                            <h5>Vault ID</h5>
                            <p>{auction.userVaultId}</p>
                        </>
                        )
                      : null}
                    {auction.contract === CONTRACTS_NAMES.systemSurplusAuction
                      ? (
                        <>
                            <h5>Lot</h5>
                            <p>{auction.lot} QUSD</p>
                        </>
                        )
                      : null}
                </div>
                <div>
                    <h5>Bidder</h5>
                    <p>{auction.bidder}</p>
                </div>
            </div>
            <AuctionActions auction={auction} />
        </AuctionCardBodyContainer>
  )
}

export default CardBody
