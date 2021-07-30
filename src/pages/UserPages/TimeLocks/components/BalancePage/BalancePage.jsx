import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from "store/selectors/user-inf";
import { setDepositLockedAmount, setPurgeTimeLocksAmount } from "store/actions/action-creaters/locked-amount";


import CustomBlock from 'components/Base/CustomBlock';
import { BlockWrap } from '../../styles';
import ListPaganation from './ListPaganation';
import ModalButton from 'components/Base/Buttons/Button';
import Modal from './Modal';


function BalancePage({ balance, title, lockAmountData, timeLockBalance, contract }) {
    const dispatch = useDispatch();

    const userAddress = useSelector(userAddressMetamask);

    const [modalShow, setModalShow] = useState(false);

    const setDeposit = (data) => {
        dispatch(setDepositLockedAmount({ data, contract, userAddress }));
    };

    const setPurge = () => {
        dispatch(setPurgeTimeLocksAmount(contract))
    }

    return (
        <CustomBlock>
            <BlockWrap>
                <h5>{title}</h5>
                <h4>{balance + ' Q'}</h4>
            </BlockWrap>
            <BlockWrap>
                <h5>Time lock balance</h5>
                <h4>{timeLockBalance} Q</h4>
            </BlockWrap>

            <h5>Time locks</h5>
            <div style={{ position: 'relative' }}>
                <ModalButton
                    type="outline"
                    title="Manage"
                    width="80px"
                    handleButton={() => {
                        setModalShow(true);
                    }}
                />
                <ListPaganation lockAmountData={lockAmountData} />
            </div>
            <Modal contract={contract} setPurge={setPurge} setDeposit={setDeposit} modalShow={modalShow} setModalShow={(value) => setModalShow(value)} />
        </CustomBlock >
    )
}

export default BalancePage
