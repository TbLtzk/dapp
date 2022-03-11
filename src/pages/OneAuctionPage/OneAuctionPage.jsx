import React, { useState, useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import { SkeletonAuctionLoading } from 'components/Base/SkeletonLoading'
import { AUCTIONS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import { getOneAuction } from 'store/auctions/action-creators'
import { oneAuctionSelector } from 'store/auctions/selectors'
import {
  ListCardWrp,
  ListCardHeader,
  ListCardBody
} from '../Auctions/components/AuctionsList/components/AuctionCard/styles'
import CardBody from '../Auctions/components/AuctionsList/components/CardBody'
import { transactionCounter } from 'store/transaction-handler/selectors'

import CustomCardButtons from 'components/Custom/CustomCardButtons'
import { theme } from 'store/theme/selectors'
import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import SidebarCards from '../Auctions/components/SidebarCards'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { createShareText } from 'func/useful'
import { isEmpty } from 'lodash'
import { ERROR_TYPES } from 'contracts/helpers/auctions-helpers/auction-service-helper'

function OneAuctionPage ({ match }) {
  const dispatch = useDispatch()
  const currentTheme = useSelector(theme)
  const update = useSelector(transactionCounter)
  const pageName = getPageName(match.params.contract)

  const [errorMessage, setErrorMessage] = useState(null)
  const auction = useSelector(oneAuctionSelector)

  function getPageName (type) {
    switch (type) {
      case AUCTIONS_TYPES.liquidation:
        return 'Liquidation'
      case AUCTIONS_TYPES.systemDebt:
        return 'System Debt'
      case AUCTIONS_TYPES.systemSurplus:
        return 'System Surplus'
      default:
        return 'AUCTIONS'
    }
  }

  function getAuction () {
    if (!match.params.id || !match.params.contract) {
      setErrorMessage(ERROR_TYPES.wrongLink)
    } else {
      const [id, address] = match.params.id.split('+')
      dispatch(getOneAuction(match.params.contract, id, address))
    }
  }

  useEffect(() => {
    if (!update) {
      getAuction()
    }
  }, [update])

  const card = (
        <ListCardWrp palette={currentTheme}>
            <ListCardHeader>
                <div>
                    <h1>{auction.title}</h1>
                    <div className="list-card__status">{auction.status}</div>
                </div>
                <div>
                    <CustomCardButtons
                        onePage={true}
                        shareText={createShareText('auction', auction.contract, auction.id, auction.user)}
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
                <CardBody auction={auction} />
            </ListCardBody>
        </ListCardWrp>
  )

  return (
        <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle={pageName}>
            <div>
                {errorMessage || (isEmpty(auction)
                  ? (
                    <SkeletonAuctionLoading />
                    )
                  : auction.error
                    ? (
                        auction.error
                      )
                    : (
                        card
                      ))}
            </div>
            <SidebarCards />
        </PageWrap>
  )
}

export default OneAuctionPage
