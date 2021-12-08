import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { formObject } from 'store/modal-handler/selectors'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { setApproveModalBtn } from 'store/auctions/action-creators'

import { AUCTIONS_TYPES } from 'constants/statuses'

import InputGroup from 'components/Custom/ModalActions/InputGroup'

import { liquidation, systemSurplus, systemDebt } from './constants'

import { checkTabContract } from '../constants'
import { symbol } from 'store/stable-coin/selectors'
import { switchContract } from 'contracts/helpers/auctions-helpers/auction-service-helper'
import { getStableCoinInstance } from 'contracts/contract-instance'

function CreateStep1 (props) {
  const { activeTab, register, errors } = props
  const formData = useSelector(formObject)
  const userAddress = useSelector(userAddressMetamask)
  const dispatch = useDispatch()
  const symbolType = useSelector(symbol)

  const onChangeInput = async (value) => {
    const stableCoin = await getStableCoinInstance()
    const contractName = await checkTabContract(activeTab)
    const { address } = await switchContract(contractName)
    const allowance = await stableCoin.allowance(userAddress, address)
    if (Number(value) > allowance) {
      dispatch(setApproveModalBtn(true))
    } else {
      dispatch(setApproveModalBtn(false))
    }
  }

  const showData = (data, symbol = '') => {
    return (
            <>
                <h4>{data.subtitleInput + symbol}</h4>
                <InputGroup
                    onChangeInput={onChangeInput}
                    formData={formData}
                    inputArr={data.inputPlaceholder}
                    inputsObj={data.inputObj}
                    register={register}
                    errors={errors}
                />
            </>
    )
  }

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
