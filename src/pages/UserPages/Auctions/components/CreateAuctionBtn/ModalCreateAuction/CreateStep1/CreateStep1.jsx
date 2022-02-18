import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { formObject } from 'store/modal-handler/selectors'
import { symbol } from 'store/stable-coin/selectors'

import InputGroup from 'components/Custom/ModalActions/InputGroup'
import { getEPDRUint } from 'contracts/helpers/epdr-param-helper'

import { liquidation, systemDebt, systemSurplus } from './constants'
import { AUCTIONS_TYPES } from 'constants/statuses'

function CreateStep1 ({ activeTab, register, errors }) {
  const formData = useSelector(formObject)
  const symbolType = useSelector(symbol)
  const [surplusLot, setSurplusLot] = useState('0')
  const [reserveLot, setReserveLot] = useState('0')

  useEffect(() => {
    getEPDRUint('governed.EPDR.QUSD_surplusLot', setSurplusLot)
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot)
  }, [])

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        return (
                    <>
                        <h4>{liquidation.subtitleInputUp}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={liquidation.inputPlaceholderUp}
                            inputsObj={liquidation.inputUpObj}
                            register={register}
                            errors={errors}
                        />
                        <h4>{liquidation.subtitleInputMiddle}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={liquidation.inputPlaceholderMiddle}
                            inputsObj={liquidation.inputMiddleObj}
                            register={register}
                            errors={errors}
                        />
                        <h4>{liquidation.subtitleInputDown + symbolType}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={liquidation.inputPlaceholderDown}
                            inputsObj={liquidation.inputDownObj}
                            register={register}
                            errors={errors}
                        />
                    </>
        )
      case AUCTIONS_TYPES.systemDebt:
        return (
                    <>
                        <h5>{systemDebt.subtitleInputUp}</h5>
                        <p>{reserveLot + 'Q'}</p>

                        <h4>{systemDebt.subtitleInputDown + symbolType}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={systemDebt.inputPlaceholder}
                            inputsObj={systemDebt.inputObj}
                            register={register}
                            errors={errors}
                        />
                    </>
        )
      case AUCTIONS_TYPES.systemSurplus:
        return (
                    <>
                        <h5>{systemSurplus.subtitleInputUp}</h5>
                        <p>{surplusLot + ' ' + symbolType}</p>

                        <h4>{systemSurplus.subtitleInputDown}</h4>
                        <InputGroup
                            formData={formData}
                            inputArr={systemSurplus.inputPlaceholder}
                            inputsObj={systemSurplus.inputObj}
                            register={register}
                            errors={errors}
                        />
                    </>
        )
      default:
        return null
    }
  }, [activeTab, register, errors, reserveLot, surplusLot])

  return <div>{switchContentOnTypeProposal()}</div>
}

export default CreateStep1
