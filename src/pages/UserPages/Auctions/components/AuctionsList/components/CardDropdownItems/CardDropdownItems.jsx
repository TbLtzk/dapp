import React from 'react'

import { Dropdown } from 'react-bootstrap'
import { remainDate } from 'func/convertDate'

function CardDropdownItems (props) {
  const { auction, handleExecute, handleBid } = props

  function getActions () {
    switch (auction.contract) {
      case 'SystemDebtAuction':
      case 'LiquidationAuction':
        if (auction?.status === 'Active') {
          if (remainDate(auction.endTime) === 0) {
            return (
                            <Dropdown.Item onClick={handleExecute}>
                                <i className={'mdi mdi-play btn-icon'} />
                                Execute
                            </Dropdown.Item>
            )
          }
          if (remainDate(auction.endTime) !== 0) {
            return (
                            <Dropdown.Item onClick={handleBid}>
                                <i className={'mdi mdi-shape-circle-plus btn-icon'} />
                                Bid
                            </Dropdown.Item>
            )
          }
          return null
        }
        return null
      case 'SystemSurplusAuction':
        let status = ''
        if (auction.endTime === 0 || remainDate(auction.endTime) !== 0) status = 'Pending'
        if (auction.isExecuted) status = 'Executed'
        if (!auction.isExecuted && remainDate(auction.endTime) === 0) status = 'Accepted'
        if (status === 'Accepted') {
          return (
                        <Dropdown.Item onClick={handleExecute}>
                            <i className={'mdi mdi-play btn-icon'} />
                            Execute
                        </Dropdown.Item>
          )
        }
        if (status === 'Pending') {
          return (
                        <Dropdown.Item onClick={handleBid}>
                            <i className={'mdi mdi-shape-circle-plus btn-icon'} />
                            Bid
                        </Dropdown.Item>
          )
        }
    }
  }

  return <>{getActions()}</>
}

export default CardDropdownItems
