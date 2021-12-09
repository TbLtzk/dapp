import React, { useEffect, useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import ModalWindow from 'components/Base/ModalWindow'
import ValidatorPool from './components/ValidatorPool'
import RewardStats from './components/RewardStats'
import { compoundRateKeeperExistsSelector } from 'store/validators/selectors'
import { getCompoundRateKeeperExists } from 'store/validators/action-creators'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from 'components/Base/Tooltip'

function ManageStakerRewardPool () {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const compoundRateKeeperExists = useSelector(compoundRateKeeperExistsSelector)

  useEffect(() => {
    dispatch(getCompoundRateKeeperExists())
  }, [dispatch])

  return (
        <>
            <Tooltip placement='left' additionalInfo="Only available for Validators" disabled={compoundRateKeeperExists}>
                <Button
                    disabled={!compoundRateKeeperExists}
                    type="white"
                    title="Manage Staker Reward Pool"
                    handleButton={() => {
                      setModalShow(true)
                    }}
                />
            </Tooltip>

            <ModalWindow
                show={modalShow}
                onHide={() => {
                  setModalShow(false)
                }}
                modalTitle="Manage Staker Reward Pool"
                content={
                    <>
                        <div className="modal-line" />
                        <ValidatorPool modalShow={modalShow} />
                        <div className="modal-line" />
                        <RewardStats modalShow={modalShow} />
                    </>
                }
            />
        </>
  )
}

export default ManageStakerRewardPool
