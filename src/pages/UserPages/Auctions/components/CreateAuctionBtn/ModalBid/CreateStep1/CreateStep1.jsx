import React, { useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { AUCTIONS_TYPES } from 'constants/statuses'
import InputGroup from 'components/Custom/ModalActions/InputGroup'
import { liquidation, systemSurplus, systemDebt } from './constants'

import { symbol } from 'store/stable-coin/selectors'
import CopyToClipboard from 'components/Base/CopyToClipboard'
import { BN } from 'func/useful'

function CreateStep1 ({ activeTab, register, errors, raisingBid, watch, allowance, setApproveButton }) {
  const symbolType = useSelector(symbol)

  const onChangeInput = async (value) => {
    const moreThanAllowance = BN(value).comparedTo(allowance) === 1
    if (moreThanAllowance) {
      setApproveButton(true)
    } else {
      setApproveButton(false)
    }
  }

  useEffect(() => {
    onChangeInput(watch('bid'))
  }, [watch])

  const showData = (data, symbol = '') => (
        <>
            <h4>{data.subtitleInput + symbol}</h4>
            <h4>
                Minimum bid: <CopyToClipboard valueToCopy={raisingBid}>{raisingBid}</CopyToClipboard>{' '}
                {symbol || data.symbol}
            </h4>
            <InputGroup
                inputArr={data.inputPlaceholder}
                inputsObj={data.inputObj}
                register={register}
                errors={errors}
            />
        </>
  )

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        return showData(liquidation, symbolType)
      case AUCTIONS_TYPES.systemDebt:
        return showData(systemDebt, symbolType)
      case AUCTIONS_TYPES.systemSurplus:
        return showData(systemSurplus)
      default:
        return null
    }
  }, [activeTab, register, errors])

  return <div>{switchContentOnTypeProposal()}</div>
}

export default CreateStep1
