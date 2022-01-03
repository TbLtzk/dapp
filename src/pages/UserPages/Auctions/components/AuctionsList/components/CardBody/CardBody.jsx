import { CONTRACTS_NAMES } from 'constants/contracts'
import React from 'react'

import { useSelector } from 'react-redux'
import { symbol } from 'store/stable-coin/selectors'
import AuctionActions from '../AuctionActions'

function CardBody ({ auction }) {
  const symbolType = useSelector(symbol)

  return (
        <div>
            <div className="list-card__three-colm">
                <div>
                    <h5>Highest Bid</h5>
                    <p>
                        {auction.highestBid}
                        {auction.contract === CONTRACTS_NAMES.systemSurplusAuction ? ' Q' : ' ' + symbolType}
                    </p>
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
                    {auction.contract === CONTRACTS_NAMES.liquidationAuction
                      ? (
                        <>
                            <h5>Auctioned Collateral</h5>
                            <p>{`${auction.colAsset} ${auction.colKey}`}</p>
                        </>
                        )
                      : null}
                </div>
                <div>
                    {auction.contract === CONTRACTS_NAMES.systemSurplusAuction
                      ? (
                        <>
                            <h5>Auction Initiated by</h5>
                            <p>{auction.user}</p>
                        </>
                        )
                      : null}
                    {auction.contract === CONTRACTS_NAMES.systemDebtAuction
                      ? (
                        <>
                            <h5>Reserve Lot</h5>
                            <p>{auction.reserveLot} Q</p>
                        </>
                        )
                      : null}
                </div>
            </div>
            <AuctionActions auction={auction} />
        </div>
  )
}

export default CardBody
