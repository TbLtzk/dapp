import React, {useCallback, useMemo} from "react";
import PropTypes from 'prop-types';

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";
import {useDispatch, useSelector} from "react-redux";
import {stakeToPanel, announceWithdrawal, withdraw} from "store/actions/action-creaters/root-contract";
import {userAddressMetamask} from "store/selectors/user-inf";
import {stakeToPanelTransId} from "store/selectors/root-contract";

import RootService from "api/contracts/RootService";

import {Col, Row} from "react-bootstrap";
import Button from "components/Base/Button";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function ActionButtons(props) {
    const {handleSubmit} = props;
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const dispatch = useDispatch();
    const rootService = new RootService(drizzle);
    const userAddress = useSelector(userAddressMetamask);
    const stakeToPanelTransactionId = useSelector(stakeToPanelTransId);

    const checkStakeToStatusTransaction = useCallback(() => {
        console.log("stakeToPanelTransactionId", stakeToPanelTransactionId);
        console.log("state.transactionStack[stackId]", state.transactionStack[stakeToPanelTransactionId]);
        if (state.transactionStack[stakeToPanelTransactionId]) {
            const txHash = state.transactionStack[stakeToPanelTransactionId];

            console.log("txHash].status", state.transactions[txHash]?.status);
            return
        }
        return "Stake to Panel";


    }, [state.transactionStack]);

    const convertToGWei = (amount) => {
        return drizzle.web3.utils.toWei(amount, 'gwei');
    };

    const onStakeToPanel = useCallback(async (data) => {
        // console.log('Stake to Panel', data?.amount);
        // console.log('Stake to Panel wei', convertToGWei(data?.amount));
        // const res = await drizzle.contracts.Root.methods.commitStake.cacheSend({
        //     gasPrice: convertToGWei(data?.amount),
        //     from: '0x00ec0a77f6813db9c01c65d2e2a086ee60e69ed7'
        // });
        // console.log("res", res);
        // const accounts = await window.ethereum.enable();
        // const account = accounts[0];
        // console.log("account", account);

        dispatch(stakeToPanel(rootService,
            {
                gasPrice: convertToGWei(data?.amount),
                from: userAddress
            }
        ));


    }, [drizzle]);

    // console.log("stakeToPanelTransactionId", stakeToPanelTransactionId);
    // console.log("state.transactionStack[stackId]", state.transactionStack[stakeToPanelTransactionId]);
    // if (state.transactionStack[stakeToPanelTransactionId]) {
    //     const txHash = state.transactionStack[stakeToPanelTransactionId];
    //
    //     console.log("txHash].status", state.transactions[txHash]?.status);
    // }

    const onWithdrawFromPanel = useCallback(async (data) => {
        // console.log('Withdraw', data);
        const res = await drizzle.contracts.Root.methods.withdraw.cacheSend(data?.amount, userAddress,
            {
                gasPrice: convertToGWei(data?.amount),
                from: userAddress
            }
        );
        console.log("res", res);

        // dispatch(withdraw(rootService, parseInt(data.amount), userAddress))
    }, [dispatch]);

    const onAccounce = useCallback(async (data) => {
        console.log('announceWithdrawal', data);
        const res = await drizzle.contracts.Root.methods.announceWithdrawal.cacheSend(data?.amount,
            {
                gasPrice: convertToGWei(data?.amount),
                from: userAddress
            }
        );
        console.log("res", res);
        // dispatch(announceWithdrawal(rootService, parseInt(data.amount)))
    }, [dispatch]);

    return (
        <Row>
            <Col md={4}>
                <Button
                    type="full-width"
                    title="Stake to Panel"
                    handleButton={handleSubmit(onStakeToPanel)}
                />
            </Col>
            <Col md={4}>
                <Button
                    type="full-width"
                    title="Accounce"
                    handleButton={handleSubmit(onAccounce)}
                />
            </Col>
            <Col md={4}>
                <Button
                    type="full-width"
                    title="Withdraw from Panel"
                    handleButton={handleSubmit(onWithdrawFromPanel)}
                />
            </Col>
        </Row>
    );
}

ActionButtons.propTypes = {
    handleSubmit: PropTypes.func
};

export default ActionButtons;

