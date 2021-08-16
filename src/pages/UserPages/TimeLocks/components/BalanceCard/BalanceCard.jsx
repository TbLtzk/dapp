import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDepositLockedAmount, setPurgeTimeLocksAmount } from 'store/actions/action-creaters/locked-amount'

import CustomBlock from 'components/Base/CustomBlock'
import ListPaganation from './TimeLocksTable/TimeLocksTable'
import ModalButton from 'components/Base/Buttons/Button'
import ModalManage from './ModalManage'

function BalanceCard ({ balance, title, lockAmountData, timeLockBalance, contract, address }) {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const setDeposit = (data) => {
    dispatch(setDepositLockedAmount({ contract, ...data, address }))
  }

  const setPurge = () => {
    dispatch(setPurgeTimeLocksAmount({ contract, address }))
    setModalShow(false)
  }

  return (
        <CustomBlock>
            <h5>{title}</h5>
            <p>{balance + ' Q'}</p>
            <h5>Time locked balance</h5>
            <p>{timeLockBalance} Q</p>
            <ListPaganation lockAmountData={lockAmountData} />
            <ModalManage
                address={address}
                modalTitle={contract === 'vesting' ? 'Deposit, withdraw & purge' : 'Deposit & purge'}
                contract={contract}
                setPurge={setPurge}
                setDeposit={setDeposit}
                modalShow={modalShow}
                setModalShow={(value) => setModalShow(value)}
            />
            <div className="button__bottom">
                <ModalButton
                    type="outline"
                    title="Manage"
                    width="80px"
                    handleButton={() => {
                      setModalShow(true)
                    }}
                />
            </div>
            <div style={{ height: '30px' }} />
        </CustomBlock>
  )
}

export default BalanceCard
