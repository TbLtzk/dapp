import React, { useState, useEffect } from "react";
import PageWrap from "components/Base/PageWrap";
import { useDispatch, useSelector } from "react-redux";
import { userAddressMetamask } from "store/selectors/user-inf";

import { getQVaultAmount } from 'store/actions/action-creaters/locked-amount';
import { qVaultAmount } from 'store/selectors/locked-amount';

import AddressForm from "./components/AddressForm";
import { InfoWrap } from "./styles";
import BalancePage from "./components/BalancePage";

function TimeLocks() {
    const userAddress = useSelector(userAddressMetamask);
    const [address, setAddress] = useState({ token: userAddress })
    const qVaultArray = useSelector(qVaultAmount)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQVaultAmount(address.token))
    }, [dispatch, address])

    const handleRefresh = (userAddress) => {
        setAddress(userAddress);
    };

    return (
        <PageWrap headerTitle="Time Locks">
            <AddressForm setAddressRefresh={handleRefresh} address={address} />
            <InfoWrap>
                <BalancePage title="Q Vault account balance" lockAmountData={qVaultArray === 0 ? [] : qVaultArray} />
                <BalancePage title="Root stake balance" lockAmountData={qVaultArray === 0 ? [] : qVaultArray} />
                <BalancePage title="Validator stake balance" lockAmountData={qVaultArray === 0 ? [] : qVaultArray} />
                <BalancePage title="Vesting balance" lockAmountData={qVaultArray === 0 ? [] : qVaultArray} />
            </InfoWrap>
        </PageWrap>
    );
}

export default TimeLocks;
