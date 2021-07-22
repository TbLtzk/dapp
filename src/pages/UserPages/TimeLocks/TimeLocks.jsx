import React from 'react'
import PageWrap from 'components/Base/PageWrap';

import Button from 'components/Base/Buttons/Button';
import QVaultBalance from './components/QVaultBalance';
import ValidatorBalance from './components/ValidatorBalance';
import RootBalance from './components/RootBalance';
import VestingBalance from './components/VestingBalance';
import AddressForm from './components/AddressForm';
import { InfoWrap } from './styles'

function TimeLocks() {
    return (
        <PageWrap
            headerTitle='Time Locks'
        >
            <AddressForm />
            <InfoWrap>
                <QVaultBalance />
                <ValidatorBalance />
                <RootBalance />
                <VestingBalance />
            </InfoWrap>
        </PageWrap>
    )
}

export default TimeLocks
