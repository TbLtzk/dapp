import React from 'react'
import PageWrap from 'components/Base/PageWrap'
import CreateAuctionBtn from './components/CreateAuctionBtn'

import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector
} from 'store/auctions/selectors'

import { AUCTIONS_TYPES } from 'constants/statuses'
import { useSelector } from 'react-redux'
import { AuctionsTabWrp } from './styles'
import AuctionsList from './components/AuctionsList'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import SidebarCards from './components/SidebarCards'

function Auctions ({ auctionsType }) {
  const auctions = getAuctions(auctionsType)
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
        return useSelector(liquidationAuctionsSelector)
      case AUCTIONS_TYPES.systemDebt:
        return useSelector(systemDebtAuctionsSelector)
      case AUCTIONS_TYPES.systemSurplus:
        return useSelector(systemSurplusAuctionsSelector)
    }
  }

  const tabsItems = [
    {
      label: 'active-auctions',
      title: 'Active auctions',
      content: (
                <AuctionsTabWrp>
                    <AuctionsList auctions={auctions.activeAuctions} loadingAuctions={!auctions?.contract} />
                    <SidebarCards />
                </AuctionsTabWrp>
      )
    },
    {
      label: 'ended-auctions',
      title: 'Ended auctions',
      content: (
                <AuctionsTabWrp>
                    <AuctionsList auctions={auctions.endedAuctions} loadingAuctions={!auctions?.contract} />
                    <SidebarCards />
                </AuctionsTabWrp>
      )
    }
  ]

  return (
        <PageWrap headerTitle={name} headerExtra={<CreateAuctionBtn auctionsType={auctionsType} />}>
            <BigTabsView tabsItems={tabsItems} active={tabsItems[0]?.label} />
        </PageWrap>
  )
}

export default Auctions
