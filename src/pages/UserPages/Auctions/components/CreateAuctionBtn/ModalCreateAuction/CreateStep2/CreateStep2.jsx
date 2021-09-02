import React, { useCallback, useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/selectors/auctions/modalHandler'
import { AUCTIONS_TYPES } from 'constants/statuses'
import { getEPDRUint } from 'contracts/handler/ContractsEPDR'

function CreateStep2 (props) {
  const {
    activeTab,
    register,
    errors
  } = props

  const formData = useSelector(formObject)
  const [surplusLot, setSurplusLot] = useState('0')
  const [reserveLot, setReserveLot] = useState('0')

  useEffect(() => {
    getEPDRUint('governed.EPDR.QUSD_surplusLot', setSurplusLot)
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot)
  }, [])

  const showCommonData = (children) => {
    return (
      <div>
        <h2>Chosen data</h2>
        <h5>Type</h5>
        <p> {formData?.first?.replace(/-/g, ' ')}</p>
        {children}
        <h5>Bid</h5>
        <p>{formData.bid}</p>
      </div>
    )
  }

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        return showCommonData(
          <>
            <h5>Address of vault holder, which shall be liquidated</h5>
            <p>{formData.address}</p>
            <h5>The Vault ID to be liquidated</h5>
            <p>{formData['vault-id']}</p>
          </>
        )
      case AUCTIONS_TYPES.systemDebt:
        return showCommonData(<>
          <h5>Auction Lot</h5>
          <p>{reserveLot} Q</p>
        </>)
      case AUCTIONS_TYPES.systemSurplus:
        return showCommonData(<>
          <h5>Auction Lot</h5>
          <p>{surplusLot} QUSD</p>
        </>)
      default:
        return null
    }
  }, [activeTab, register, surplusLot, reserveLot, errors])

  return (
    <>
      {contentSwitcher()}
    </>
  )
}

export default CreateStep2
