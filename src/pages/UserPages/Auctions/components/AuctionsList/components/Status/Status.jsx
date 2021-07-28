import React from 'react'
import { remainDate } from 'func/convertDate'

function Status (props) {
  const {
    auction
  } = props

  function getStatus () {
    switch (auction.contract) {
      case 'SystemDebtAuction':
      case 'LiquidationAuction':
        return auction?.status
      case 'SystemSurplusAuction':
        if (auction.endTime === 0 || remainDate(auction.endTime) !== 0) return 'Pending'
        if (auction.isExecuted) return 'Executed'
        if (!auction.isExecuted && remainDate(auction.endTime) === 0) return 'Accepted'
        return ''
    }
  }

  return (
    <div className="list-card__status">{getStatus()}</div>
  )
}

export default Status
