import React from 'react'

import { useSelector } from 'react-redux'
import { symbol } from 'store/selectors/stable-coin'

function CardBody (props) {
  const {
    data
  } = props
  const symbolType = useSelector(symbol)

  return (
    <div>
      <div className="list-card__three-colm">
        <div>
          <h5>Highest Bid</h5>
          <p>{data.highestBid}{data.contract === 'SystemSurplusAuction' ? ' Q' : ' ' + symbolType}</p>
          {data.contract === 'LiquidationAuction'
            ? <>
              <h5>Vault ID</h5>
              <p>{data.userVaultId}</p>
            </>
            : null
          }
          {data.contract === 'SystemSurplusAuction'
            ? <>
              <h5>Lot</h5>
              <p>{data.lot} QUSD</p>
            </>
            : null
          }
        </div>
        <div>
          <h5>Bidder</h5>
          <p>{data.bidder}</p>
          {data.contract === 'LiquidationAuction'
            ? <>
              <h5>{data.colAsset}</h5>
              <p>{data.colKey}</p>
            </>
            : null
          }
        </div>
        <div>
          {data.contract === 'LiquidationAuction'
            ? <>
              <h5>Vault Owner</h5>
              <p>{data.user}</p>
            </>
            : null
          }
          {data.contract === 'SystemSurplusAuction'
            ? <>
              <h5>Auction Initiated by</h5>
              <p>{data.user}</p>
            </>
            : null
          }
          {data.contract === 'SystemDebtAuction'
            ? <>
              <h5>Reserve Lot</h5>
              <p>{data.reserveLot} Q</p>
            </>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default CardBody
