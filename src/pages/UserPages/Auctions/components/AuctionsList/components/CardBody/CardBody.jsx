import { CONTRACTS_NAMES } from 'constants/contracts'
import React from 'react'

import { useSelector } from 'react-redux'
import { symbol } from 'store/stable-coin/selectors'

function CardBody ({ data }) {
  const symbolType = useSelector(symbol)

  return (
        <div>
            <div className="list-card__three-colm">
                <div>
                    <h5>Highest Bid</h5>
                    <p>
                        {data.highestBid}
                        {data.contract === CONTRACTS_NAMES.systemSurplusAuction ? ' Q' : ' ' + symbolType}
                    </p>
                    {data.contract === CONTRACTS_NAMES.liquidationAuction
                      ? (
                        <>
                            <h5>Vault ID</h5>
                            <p>{data.userVaultId}</p>
                        </>
                        )
                      : null}
                    {data.contract === CONTRACTS_NAMES.systemSurplusAuction
                      ? (
                        <>
                            <h5>Lot</h5>
                            <p>{data.lot} QUSD</p>
                        </>
                        )
                      : null}
                </div>
                <div>
                    <h5>Bidder</h5>
                    <p>{data.bidder}</p>
                    {data.contract === CONTRACTS_NAMES.liquidationAuction
                      ? (
                        <>
                            <h5>Auctioned Collateral</h5>
                            <p>{`${data.colAsset} ${data.colKey}`}</p>
                        </>
                        )
                      : null}
                </div>
                <div>
                    {data.contract === CONTRACTS_NAMES.systemSurplusAuction
                      ? (
                        <>
                            <h5>Auction Initiated by</h5>
                            <p>{data.user}</p>
                        </>
                        )
                      : null}
                    {data.contract === CONTRACTS_NAMES.systemDebtAuction
                      ? (
                        <>
                            <h5>Reserve Lot</h5>
                            <p>{data.reserveLot} Q</p>
                        </>
                        )
                      : null}
                </div>
            </div>
        </div>
  )
}

export default CardBody
