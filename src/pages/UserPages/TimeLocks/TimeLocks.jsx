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
import { getRootNodeStakes } from "store/actions/action-creaters/root-contract";
import { rootNodeStake } from "store/selectors/root-contract";

import { getUserBalance } from "store/actions/action-creaters/q-vault";
import { userBalance } from "store/selectors/q-vault";

import AddressForm from "./components/AddressForm";
import { InfoWrap } from "./styles";
import BalanceCard from "./components/BalanceCard";
import { fromWei } from "func/balance";
import RootService from "contracts/src/Root";

import Handler from "../Staking/ValidatorStaking/AccountStatus/handler";

function TimeLocks() {
    const dispatch = useDispatch();
    const [accountableTotalStake, setAccountableTotalStake] = useState(0);

    const userAddress = useSelector(userAddressMetamask);

    const qVaultLockedAmount = useSelector(qVaultAmount);
    const rootNodeLockedAmount = useSelector(rootNodeAmount);
    const validatorLockedAmount = useSelector(validatorAmount);
    const amountNodeStake = useSelector(rootNodeStake);

    const qVaultMin = fromWei(Number(qVaultLockedAmount?.minQVaultAmount?.amount));
    const rootNodeMin = fromWei(Number(rootNodeLockedAmount?.minRootNodeAmount?.amount));
    const validatorMin = fromWei(Number(validatorLockedAmount?.minValidatorAmount?.amount));

    const [address, setAddress] = useState({ token: userAddress });

    const userQVBalance = useSelector(userBalance);
    // const rootNodeArray = useSelector(rootNodeAmount)
    // const validatorArray = useSelector(validatorAmount)
    // const vestingArray = useSelector(vestingAmount)

    const rootService = new RootService();
    const handler = new Handler(address.token, useDispatch());

    useEffect(() => {
        dispatch(getQVaultAmount(address.token));
        dispatch(getRootNodeAmount(address.token));
        dispatch(getValidatorAmount(address.token));
        dispatch(getUserBalance(address.token));
        dispatch(getRootNodeStakes(rootService, address.token));
        // dispatch(getVestingAmount(address))
    }, [dispatch, address]);

    useEffect(() => {
        handler.setAccountableTotalStake(setAccountableTotalStake);
    }, []);

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
                    title="Q Vault account balance"
                    lockAmountData={qVaultLockedAmount === 0 ? [] : qVaultLockedAmount.lockedQVaultAmounts}
                />
                <BalanceCard
                    address={address.token}
                    timeLockBalance={rootNodeMin}
                    balance={amountNodeStake}
                    contract="root"
                    title="Root stake balance"
                    lockAmountData={rootNodeLockedAmount === 0 ? [] : rootNodeLockedAmount.lockedRootNodeAmounts}
                />
                <BalanceCard
                    address={address.token}
                    timeLockBalance={validatorMin}
                    balance={accountableTotalStake}
                    contract="validators"
                    title="Validator stake balance"
                    lockAmountData={validatorLockedAmount === 0 ? [] : validatorLockedAmount.lockedValidatorAmounts}
                />
                {/* <BalanceCard setDeposit={(data) => console.log(data, 'vesting')} id='vesting' title="Vesting balance" lockAmountData={qVaultArray === 0 ? [] : qVaultArray} /> */}
            </InfoWrap>
        </PageWrap>
    );
}

export default TimeLocks;
