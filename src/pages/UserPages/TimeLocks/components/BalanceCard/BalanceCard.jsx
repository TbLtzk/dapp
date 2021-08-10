import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDepositLockedAmount, setPurgeTimeLocksAmount } from 'store/actions/action-creaters/locked-amount'

import CustomBlock from 'components/Base/CustomBlock'
import ListPaganation from './ListPaganation'
import ModalButton from 'components/Base/Buttons/Button'
import Modal from './Modal'

function BalanceCard ({ balance, title, lockAmountData, timeLockBalance, contract, address }) {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const setDeposit = (list) => {
    dispatch(setDepositLockedAmount({contract, ...list}))
  }

  const setPurge = () => {
    dispatch(setPurgeTimeLocksAmount({ contract, address }))
    setModalShow(false)
  }

  return (
        <CustomBlock>
            <h5>{title}</h5>
            <p>{balance + ' Q'}</p>
            <h5>Time lock balance</h5>
            <p>{timeLockBalance} Q</p>
            <ModalButton
                type="outline"
                title="Manage"
                width="80px"
                handleButton={() => {
                  setModalShow(true)
                }}
            />
            <h5>Time locks</h5>
            <ListPaganation lockAmountData={lockAmountData} />
            <Modal
                modalTitle={contract === 'vesting' ? 'Deposit, withdraw & purge' : 'Deposit & purge'}
                contract={contract}
                setPurge={setPurge}
                setDeposit={setDeposit}
                modalShow={modalShow}
                setModalShow={(value) => setModalShow(value)}
            />
        </CustomBlock>
  )
}

export default BalanceCard
