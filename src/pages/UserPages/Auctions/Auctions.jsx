import React from 'react'
import PageWrap from 'components/Base/PageWrap'
import CreateAuctionBtn from './components/CreateAuctionBtn'

import { liquidationAuctions, systemDebtAuctions, systemSurplusAuctions } from 'store/auctions/selectors'

import { AUCTIONS_TYPES } from 'constants/statuses'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
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
        return useSelector(liquidationAuctions)
      case AUCTIONS_TYPES.systemDebt:
        return useSelector(systemDebtAuctions)
      case AUCTIONS_TYPES.systemSurplus:
        return useSelector(systemSurplusAuctions)
    }
  }

  const tabsItems = [
    {
      label: 'active-auctions',
      title: 'Active auctions',
      content: (
                <AuctionsTabWrp>
                    <AuctionsList auctions={auctions?.activeAuctions} loadingAuctions={isEmpty(auctions)} />
                    <SidebarCards />
                </AuctionsTabWrp>
      )
    },
    {
      label: 'ended-auctions',
      title: 'Ended auctions',
      content: (
                <AuctionsTabWrp>
                    <AuctionsList auctions={auctions?.endedAuctions} loadingAuctions={isEmpty(auctions)} />
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
