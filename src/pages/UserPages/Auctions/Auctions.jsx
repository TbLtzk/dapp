import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import CreateAuctionBtn from './components/CreateAuctionBtn'

import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector
} from 'store/auctions/selectors'

import { AUCTIONS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import { AuctionsTabWrp } from './styles'
import AuctionsList from './components/AuctionsList'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import SidebarCards from './components/SidebarCards'
import { getAuctions } from 'store/auctions/action-creators'

function Auctions ({ auctionsType }) {
  const { auctions, title } = getAuctionsData(auctionsType)
  const dispatch = useDispatch()

  function getAuctionsData (type) {
    switch (type) {
      case AUCTIONS_TYPES.liquidation:
        return { auctions: useSelector(liquidationAuctionsSelector), title: 'Liquidation' }
      case AUCTIONS_TYPES.systemDebt:
        return { auctions: useSelector(systemDebtAuctionsSelector), title: 'System Debt' }
      case AUCTIONS_TYPES.systemSurplus:
        return { auctions: useSelector(systemSurplusAuctionsSelector), title: 'System Surplus' }
    }
  }

  useEffect(() => {
    dispatch(getAuctions(auctionsType))
  }, [])

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
        <PageWrap headerTitle={title} headerExtra={<CreateAuctionBtn auctionsType={auctionsType} />}>
            <BigTabsView tabsItems={tabsItems} active={tabsItems[0]?.label} />
        </PageWrap>
  )
}

export default Auctions
