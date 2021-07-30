import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import ListPaganation from './ListPaganation';

function BalancePage({ title, lockAmountData, timeLockBalance, contract }) {
    return (
        <CustomBlock>
            <h5>{title}</h5>
            <h4>{10 + ' Q'}</h4>
            <h5>Time lock balance</h5>
            <h4>{timeLockBalance} Q</h4>
            <h5>Time locks</h5>
            <ListPaganation lockAmountData={lockAmountData} />
        </CustomBlock >
    )
}

export default BalancePage
