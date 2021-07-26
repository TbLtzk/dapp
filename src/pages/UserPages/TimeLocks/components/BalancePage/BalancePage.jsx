import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { qVaultAmount } from 'store/selectors/locked-amount';
import { getQVaultAmount } from 'store/actions/action-creaters/locked-amount';

import CustomBlock from 'components/Base/CustomBlock';
import { BlockWrap, Button, TableTR } from '../../styles';
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination';
import ListPaganation from './ListPaganation';


function BalancePage({ title, lockAmountData}) {

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
                <ListPaganation lockAmountData={lockAmountData}/>
                <Button>
                    Purge expired time locks
                </Button>
            </div>
        </CustomBlock >
    )
}

export default BalancePage
