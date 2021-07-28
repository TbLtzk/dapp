import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import { BlockWrap, TableTR } from '../../styles';
import ListPaganation from './ListPaganation';
import ModalButton from 'components/Base/Buttons/Button';
import Modal from './Modal';


function BalancePage({ balance, title, lockAmountData, setDeposit, timeLockBalance, contract }) {

    const [modalShow, setModalShow] = useState(false);

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
            <Modal contract={contract} setDeposit={setDeposit} modalShow={modalShow} setModalShow={(value) => setModalShow(value)} />
        </CustomBlock >
    )
}

export default BalancePage
