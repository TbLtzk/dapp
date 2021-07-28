import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import AuctionsTab from './components/AuctionsTab'
import CreateAuctionBtn from './components/CreateAuctionBtn'

import {
  liquidationAuctions,
  systemDebtAuctions,
  systemSurplusAuctions,
  errorM,
  loadingAuctions,
  endedAuctionsArr,
  endedLoadingAuctions,
  endedErrorM
} from 'store/selectors/auctions/auctions'
import { getAuctionsList, getEndedAuctionsList } from 'store/actions/action-creaters/auctions/auctions'

import { AUCTIONS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import { getSymbol } from 'store/actions/action-creaters/stable-coin'
import { transactionLoading } from 'store/selectors/transaction-handler'

function Auctions (props) {
  const {
    auctionsType
  } = props
  const dispatch = useDispatch()

  const auctions = getAuctions(auctionsType)
  const endedAuctions = useSelector(endedAuctionsArr)
  const isLoading = useSelector(loadingAuctions)
  const isEndedLoading = useSelector(endedLoadingAuctions)
  const error = useSelector(errorM)
  const endedError = useSelector(endedErrorM)
  const loadingTransaction = useSelector(transactionLoading)

  const name = getPageName(auctionsType)

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

  function getAuctions (type) {
    switch (type) {
      case AUCTIONS_TYPES.liquidation:
        return useSelector(liquidationAuctions)
      case AUCTIONS_TYPES.systemDebt:
        return useSelector(systemDebtAuctions)
      case AUCTIONS_TYPES.systemSurplus:
        return useSelector(systemSurplusAuctions)
    }
  }

  useEffect(() => {
    if (!loadingTransaction) {
      dispatch(getAuctionsList(auctionsType, true))
      dispatch(getEndedAuctionsList(auctionsType, false))
      dispatch(getSymbol())
    }
  }, [loadingTransaction])

  const tabsItems = [
    {
      label: 'active-auctions',
      title: 'Active auctions',
      content: <AuctionsTab
        isLoading={isLoading}
        auctions={auctions}
        auctionsType={auctionsType}
        errorMessage={error}
      />
    },
    {
      label: 'ended-auctions',
      title: 'Ended auctions',
      content: <AuctionsTab
        isLoading={isEndedLoading}
        auctions={endedAuctions}
        auctionsType={auctionsType}
        errorMessage={endedError}
      />
    }
  ]

  return (
    <PageWrap
      headerTitle={name}
      headerExtra={<CreateAuctionBtn activeTab={auctionsType}/>}
    >
      <BigTabsView
        tabsItems={tabsItems}
        active={tabsItems[0]?.label}
      />
    </PageWrap>
  )
};

export default Auctions
