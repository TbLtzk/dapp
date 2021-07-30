import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import ListPaganation from './ListPaganation';

function BalancePage({ title, lockAmountData }) {
    return (
        <CustomBlock>
            <h5>{title}</h5>
            <p>10 Q</p>
            <h5>Time lock balance</h5>
            <p>10 Q</p>
            <h5>Time locks</h5>
            <ListPaganation lockAmountData={lockAmountData} />
        </CustomBlock >
    )
}

export default BalancePage
