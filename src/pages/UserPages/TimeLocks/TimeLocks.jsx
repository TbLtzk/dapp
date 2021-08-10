import React, { useState, useEffect } from "react";
import PageWrap from "components/Base/PageWrap";
import { useDispatch, useSelector } from "react-redux";
import { userAddressMetamask } from "store/selectors/user-inf";

import {
    getQVaultAmount,
    getRootNodeAmount,
    getValidatorAmount,
    getVestingAmount,
} from "store/actions/action-creaters/locked-amount";
import { getSelfStake } from "store/actions/action-creaters/validators";
import { selfStake } from "store/selectors/validators";
import { qVaultAmount, rootNodeAmount, validatorAmount, vestingAmount } from "store/selectors/locked-amount";
import { getRootNodeStakes } from "store/actions/action-creaters/root-contract";
import { rootNodeStake } from "store/selectors/root-contract";

import { getUserBalance } from "store/actions/action-creaters/q-vault";
import { userBalance } from "store/selectors/q-vault";

import AddressForm from "./components/AddressForm";
import { InfoWrap } from "./styles";
import BalanceCard from "./components/BalanceCard";
import { fromWei } from "func/balance";
import RootService from "contracts/src/Root";

function TimeLocks() {
    const dispatch = useDispatch();

    const userAddress = useSelector(userAddressMetamask);

    const qVaultLockedAmount = useSelector(qVaultAmount);
    const rootNodeLockedAmount = useSelector(rootNodeAmount);
    const validatorLockedAmount = useSelector(validatorAmount);
    const vestingLockedAmount = useSelector(vestingAmount);

    const amountNodeStake = useSelector(rootNodeStake);
    const validatorSelfStake = useSelector(selfStake);
    const qVaultMin = fromWei(0);
    const rootNodeMin = fromWei(0);
    const validatorMin = fromWei(0);
    const vestingMin = fromWei(0);


    const [address, setAddress] = useState({ token: userAddress });

    const userQVBalance = useSelector(userBalance);
    const contract = new RootService();

    useEffect(() => {
        dispatch(getQVaultAmount(address.token));
        dispatch(getRootNodeAmount(address.token));
        dispatch(getValidatorAmount(address.token));
        dispatch(getVestingAmount(address.token));
        dispatch(getUserBalance(address.token));
        dispatch(getRootNodeStakes(contract, address.token));
        dispatch(getSelfStake(address.token));
    }, [dispatch, address]);

    const handleRefresh = (userAddress) => {
        setAddress(userAddress);
    };

    return (
        <PageWrap headerTitle="Time Locks">
            <AddressForm setAddressRefresh={handleRefresh} address={address} />
            <InfoWrap>
                <BalanceCard
                    address={address.token}
                    timeLockBalance={qVaultMin}
                    balance={userQVBalance}
                    contract="qVault"
                    modalTitle="Deposit & purge"
                    title="Q Vault account balance"
                    lockAmountData={qVaultLockedAmount === null ? [] : qVaultLockedAmount.lockedQVaultAmounts}
                />
                <BalanceCard
                    address={address.token}
                    timeLockBalance={rootNodeMin}
                    balance={amountNodeStake}
                    contract="root"
                    modalTitle="Deposit & purge"
                    title="Root stake balance"
                    lockAmountData={rootNodeLockedAmount === null ? [] : rootNodeLockedAmount.lockedRootNodeAmounts}
                />
                <BalanceCard
                    address={address.token}
                    timeLockBalance={validatorMin}
                    balance={validatorSelfStake}
                    contract="validators"
                    modalTitle="Deposit & purge"
                    title="Validator stake balance"
                    lockAmountData={validatorLockedAmount === null ? [] : validatorLockedAmount.lockedValidatorAmounts}
                />
                <BalanceCard
                    address={address.token}
                    timeLockBalance={vestingMin}
                    balance={"Vesting"}
                    contract="vesting"
                    modalTitle="Deposit, withdraw & purge"
                    title="Vesting stake balance"
                    lockAmountData={vestingLockedAmount === null ? [] : vestingLockedAmount.lockedVestingAmounts}
                />
            </InfoWrap>
        </PageWrap>
    );
}

export default TimeLocks;
