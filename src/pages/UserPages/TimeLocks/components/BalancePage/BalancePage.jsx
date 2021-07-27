import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import { BlockWrap, Button, TableTR } from '../../styles';
import ListPaganation from './ListPaganation';
import ModalButton from 'components/Base/Buttons/Button';
import Modal from './Modal';


function BalancePage({ title, lockAmountData, setDeposit }) {

    const [modalShow, setModalShow] = useState(false);

    return (
        <CustomBlock>
            <BlockWrap>
                <h5>{title}</h5>
                <h4>1234 Q</h4>
            </BlockWrap>
            <BlockWrap>
                <h5>Time lock balance</h5>
                <h4>1234 Q</h4>
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
                <Button>
                    Purge expired time locks
                </Button>
            </div>
            <Modal setDeposit={setDeposit} modalShow={modalShow} setModalShow={(value) => setModalShow(value)} />
        </CustomBlock >
    )
}

export default BalancePage
