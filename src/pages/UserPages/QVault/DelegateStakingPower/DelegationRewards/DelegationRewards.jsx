import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { onClaimStakeDelegatorReward, getOutstandingDelegationRewards } from "store/actions/action-creaters/q-vault";
import { outstandingDelegationRewards } from "store/selectors/q-vault";

import { fN } from "func/useful";
import CardBlock from "components/Base/CardBlock";

export default function DelegationRewards() {
    const dispatch = useDispatch();
    const outstandingDelegationRewardsValue = useSelector(outstandingDelegationRewards);

    useEffect(() => {
        dispatch(getOutstandingDelegationRewards());
    }, [dispatch]);

    const onClaim = useCallback(() => {
        dispatch(onClaimStakeDelegatorReward());
    }, [dispatch]);

    return (
        <CardBlock
            title="Outstanding Delegation Rewards"
            firstContent={fN(outstandingDelegationRewardsValue) + " Q"}
            btnTitle="Claim Delegation Reward"
            btnHandler={onClaim}
        />
    );
}
