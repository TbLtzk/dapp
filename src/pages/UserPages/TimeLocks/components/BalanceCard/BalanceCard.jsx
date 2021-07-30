import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAddressMetamask } from "store/selectors/user-inf";
import { setDepositLockedAmount, setPurgeTimeLocksAmount } from "store/actions/action-creaters/locked-amount";

import CustomBlock from "components/Base/CustomBlock";
import ListPaganation from "./ListPaganation";
import ModalButton from "components/Base/Buttons/Button";
import Modal from "./Modal";

function BalanceCard({ balance, title, lockAmountData, timeLockBalance, contract }) {
    const dispatch = useDispatch();

    const userAddress = useSelector(userAddressMetamask);

    const [modalShow, setModalShow] = useState(false);

    const setDeposit = (data) => {
        dispatch(setDepositLockedAmount({ data, contract, userAddress }));
    };

    const setPurge = () => {
        dispatch(setPurgeTimeLocksAmount(contract));
    };

    return (
        <CustomBlock>
            <h5>{title}</h5>
            <p>{balance + " Q"}</p>
            <h5>Time lock balance</h5>
            <p>{timeLockBalance} Q</p>
            <ModalButton
                type="outline"
                title="Manage"
                width="80px"
                handleButton={() => {
                    setModalShow(true);
                }}
            />
            <h5>Time locks</h5>
            <ListPaganation lockAmountData={lockAmountData} />
            <Modal
                contract={contract}
                setPurge={setPurge}
                setDeposit={setDeposit}
                modalShow={modalShow}
                setModalShow={(value) => setModalShow(value)}
            />
        </CustomBlock>
    );
}

export default BalanceCard;
