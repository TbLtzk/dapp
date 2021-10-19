import React, { useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import ModalWindow from 'components/Base/ModalWindow'
import ValidatorPool from './components/ValidatorPool'
import RewardStats from './components/RewardStats'

function ManageStakerRewardPool () {
  const [modalShow, setModalShow] = useState(false)

  return (
        <>
            <Button
                type="white"
                title="Manage Staker Reward Pool"
                handleButton={() => {
                  setModalShow(true)
                }}
            />

            <ModalWindow
                show={modalShow}
                onHide={() => {
                  setModalShow(false)
                }}
                modalTitle="Manage Staker Reward Pool"
                content={
                    <>
                        <div className="modal-line" />
                        <ValidatorPool modalShow={modalShow}/>
                        <div className="modal-line" />
                        <RewardStats modalShow={modalShow}/>
                    </>
                }
            />
        </>
  )
}

export default ManageStakerRewardPool
