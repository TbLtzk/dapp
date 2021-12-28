import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import { Accordion } from 'react-bootstrap'

import { theme } from 'store/theme/selectors'
import CustomCardButtons from 'components/Custom/CustomCardButtons'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import CardBody from '../CardBody'
import { transformAuctionNameToAuctionType } from 'contracts/helpers/auctions-helpers/auction-service-helper'

function AuctionCard ({ auction, id }) {
  const currentTheme = useSelector(theme)
  const [open, setOpen] = useState(false)

  const checkContract = `${auction.contract === CONTRACTS_NAMES.liquidationAuction ? '+' + auction.user : ''}`

  const shareText = `${window.location.origin}/auction/${transformAuctionNameToAuctionType(auction.contract)}/${
        auction.id + checkContract
    }`

  return (
        <ListCardWrp palette={currentTheme}>
            <Accordion defaultActiveKey="0">
                <ListCardHeader>
                    <div>
                        <h1>{auction.title}</h1>
                        <div className="list-card__status">{auction.status}</div>
                    </div>
                    <div>
                        <CustomCardButtons
                            setOpen={() => setOpen(!open)}
                            open={open}
                            eventKey={id}
                            shareText={shareText}
                        />
                    </div>
                </ListCardHeader>
                <ListCardBody>
                    <div className="list-card__three-colm">
                        <div>
                            <h5>Bid Until</h5>
                            <p>{convertToMonthDayYear(auction.endTime)}</p>
                        </div>
                        <div>
                            <h5>Remaining Time for Bid</h5>
                            <p>{remainDate(auction.endTime)}</p>
                        </div>
                        <div>
                            {auction.contract === CONTRACTS_NAMES.liquidationAuction
                              ? (
                                <>
                                    <h5>Vault Owner</h5>
                                    <p>{auction.user}</p>
                                </>
                                )
                              : (
                                <>
                                    <h5>Auction Id</h5>
                                    <p>{auction.id}</p>
                                </>
                                )}
                        </div>
                    </div>
                    <Accordion.Collapse eventKey={id}>
                        <CardBody auction={auction} />
                    </Accordion.Collapse>
                </ListCardBody>
            </Accordion>
        </ListCardWrp>
  )
}

export default AuctionCard
