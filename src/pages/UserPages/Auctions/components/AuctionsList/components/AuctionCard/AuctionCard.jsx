import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import { Accordion } from 'react-bootstrap'

import { theme } from 'store/theme/selectors'
import CustomCardButtons from 'components/Custom/CustomCardButtons'
import Status from '../Status'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import CardBody from '../CardBody'

function AuctionCard ({ auction, id }) {
  const currentTheme = useSelector(theme)
  const [open, setOpen] = useState(false)

  return (
        <ListCardWrp palette={currentTheme}>
            <Accordion defaultActiveKey="0">
                <ListCardHeader>
                    <div>
                        <h1>{auction.title}</h1>
                        <Status auction={auction} />
                    </div>
                    <div>
                        <CustomCardButtons
                            setOpen={() => setOpen(!open)}
                            open={open}
                            eventKey={id}
                            shareText={'kikiki'}
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
