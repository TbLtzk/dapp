import React, { useState, useEffect } from "react";
import PageWrap from "components/Base/PageWrap";
import { useDispatch, useSelector } from "react-redux";
import { userAddressMetamask } from "store/selectors/user-inf";

import {
    getQVaultAmount,
    getRootNodeAmount,
    getValidatorAmount,
    setDepositLockedAmount,
} from "store/actions/action-creaters/locked-amount";
import { qVaultAmount, rootNodeAmount, validatorAmount } from "store/selectors/locked-amount";

import { getUserBalance } from "store/actions/action-creaters/q-vault";
import { userBalance } from "store/selectors/q-vault";

import AddressForm from "./components/AddressForm";
import { InfoWrap } from "./styles";
import BalancePage from "./components/BalancePage";
import { fromWei } from "func/balance";

function TimeLocks() {
    const dispatch = useDispatch();

    const userAddress = useSelector(userAddressMetamask);

    const qVaultLockedAmount = useSelector(qVaultAmount);
    const rootNodeLockedAmount = useSelector(rootNodeAmount);
    const validatorLockedAmount = useSelector(validatorAmount);

    const qVaultMin = fromWei(Number(qVaultLockedAmount?.minQVaultAmount?.amount));
    const rootNodeMin = fromWei(Number(rootNodeLockedAmount?.minRootNodeAmount?.amount));
    const validatorMin = fromWei(Number(validatorLockedAmount?.minValidatorAmount?.amount));

    const [address, setAddress] = useState({ token: userAddress });

    const userQVBalance = useSelector(userBalance);
    // const rootNodeArray = useSelector(rootNodeAmount)
    // const validatorArray = useSelector(validatorAmount)
    // const vestingArray = useSelector(vestingAmount)
    useEffect(() => {
        dispatch(getQVaultAmount(address.token));
        dispatch(getRootNodeAmount(address.token));
        dispatch(getValidatorAmount(address.token));
        dispatch(getUserBalance(address.token));
        // dispatch(getVestingAmount(address))
    }, [dispatch, address]);

    const handleRefresh = (userAddress) => {
        setAddress(userAddress);
    };

    return (
        <PageWrap headerTitle="Time Locks">
            <AddressForm setAddressRefresh={handleRefresh} address={address} />
            <InfoWrap>
                <BalancePage
                    timeLockBalance={qVaultMin}
                    balance={userQVBalance}
                    contract="qVault"
                    title="Q Vault account balance"
                    lockAmountData={qVaultLockedAmount === 0 ? [] : qVaultLockedAmount.lockedQVaultAmounts}
                />
                <BalancePage
                    timeLockBalance={rootNodeMin}
                    balance={"ROOT"}
                    contract="root"
                    title="Root stake balance"
                    lockAmountData={rootNodeLockedAmount === 0 ? [] : rootNodeLockedAmount.lockedRootNodeAmounts}
                />
                <BalancePage
                    timeLockBalance={validatorMin}
                    balance={"VALIDATOR"}
                    contract="validator"
                    title="Validator stake balance"
                    lockAmountData={validatorLockedAmount === 0 ? [] : validatorLockedAmount.lockedValidatorAmounts}
                />
                {/* <BalancePage setDeposit={(data) => console.log(data, 'vesting')} id='vesting' title="Vesting balance" lockAmountData={qVaultArray === 0 ? [] : qVaultArray} /> */}
            </InfoWrap>
        </PageWrap>
    );
}

export default TimeLocks;
