import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCreatedStepsLimit, setCreateObj, setStepCounter } from 'store/modal-handler/action-creators'

import ModalCreateAuction from './ModalCreateAuction'
import Button from 'components/Base/Buttons/Button'

function CreateAuctionBtn ({ auctionsType }) {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)
  const title = `Create ${auctionsType.replace(/-/g, ' ') + ' Auction'}`

  const onCreateAuction = async () => {
    dispatch(setStepCounter(1))
    dispatch(setCreatedStepsLimit(2))
    setModalShow(true)
    dispatch(setCreateObj({ contract: auctionsType }))
  }

  const onHide = () => {
    setModalShow(false)
    dispatch(setCreateObj({}))
  }

  return (
        <>
            <Button icon="plus-circle-outline" handleButton={onCreateAuction} title={title} />
            <ModalCreateAuction activeTab={auctionsType} modalShow={modalShow} onHide={onHide} />
        </>
  )
}

export default CreateAuctionBtn
