import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDepositLockedAmount, setPurgeTimeLocksAmount } from 'store/locked-amount/action-creators'

import MemberTables from 'components/Custom/MemberTables'
import CustomBlock from 'components/Base/CustomBlock'
import ModalButton from 'components/Base/Buttons/Button'
import ModalManage from './ModalManage'
import { columnnsLockAmount } from 'constants/columns'
import { tableLockAmount } from 'constants/tables'

function BalanceCard ({ balance, title, lockAmountData, timeLockBalance, contract, address }) {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)

  const setDeposit = (data) => {
    dispatch(setDepositLockedAmount({ contract, ...data, address }))
  }

  const setPurge = () => {
    dispatch(setPurgeTimeLocksAmount({ contract, address }))
  }

  return (
        <CustomBlock>
            <h5>{title}</h5>
            <p>{balance + ' Q'}</p>
            <h5>Time Locked Balance</h5>
            <p>{timeLockBalance} Q</p>
            <MemberTables
                perPageLength={4}
                emptyTableMessage="No Time Locks"
                table={tableLockAmount(lockAmountData)}
                columns={columnnsLockAmount}
            />
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
                <ModalButton type="outline" title="Manage" width="80px" handleButton={() => setModalShow(true)} />
            </div>
            <div style={{ height: '30px' }} />
        </CustomBlock>
  )
}

export default BalanceCard
