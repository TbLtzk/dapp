import React from 'react'
import { remainDate } from 'func/convertDate'
import { CONTRACT_TYPES } from 'constants/contracts'

function Status ({ auction }) {
  function getStatus () {
    switch (auction.contract) {
      case CONTRACT_TYPES.liquidationAuction:
      case CONTRACT_TYPES.systemDebtAuction:
        return auction?.status
      case CONTRACT_TYPES.systemSurplusAuction:
        if (auction.endTime === 0 || remainDate(auction.endTime) !== 0) return 'Pending'
        if (auction.isExecuted) return 'Executed'
        if (!auction.isExecuted && remainDate(auction.endTime) === 0) return 'Accepted'
        return ''
    }
  }

  return <div className="list-card__status">{getStatus()}</div>
}

export default Status
