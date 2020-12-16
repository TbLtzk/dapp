import React, {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";
import {stakeToPanel, announceWithdrawal, withdraw} from "store/actions/action-creaters/root-contract";
import {userAddressMetamask} from "store/selectors/user-inf";
import {stakeToPanelTransId, announceWithdrawTransId, withdrawTransId} from "store/selectors/root-contract";

import RootService from "api/contracts/RootService";
import LoadingSpinner from "components/Base/LoadingSpinner";

import {Col, Row} from "react-bootstrap";
import Button from "components/Base/Buttons/Button";

import {TransResult} from "./styles"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const transTempsArray = [];

function ActionButtons(props) {
    const {handleSubmit} = props;
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const dispatch = useDispatch();
    const rootService = new RootService(drizzle);
    const userAddress = useSelector(userAddressMetamask);
    const stakeToPanelTransactionId = useSelector(stakeToPanelTransId);
    const announceWithdrawTransactionId = useSelector(announceWithdrawTransId);
    const withdrawTransactionId = useSelector(withdrawTransId);

    const [transStakeToPanelStatus, setTransStakeToPanelStatus] = useState(null);
    const [transWithdrawStatus, setTransWithdrawStatus] = useState(null);
    const [transAccounceWithdrawStatus, setTransAccounceWithdrawStatus] = useState(null);

    useEffect(() => {
        if (state.transactionStack[stakeToPanelTransactionId]) {
            const txHash = state.transactionStack[stakeToPanelTransactionId];
            setTransStakeToPanelStatus(state.transactions[txHash]?.status);
        }

        if (state.transactionStack[announceWithdrawTransactionId]) {
            const txHash = state.transactionStack[announceWithdrawTransactionId];
            setTransAccounceWithdrawStatus(state.transactions[txHash]?.status);
        }

        if (state.transactionStack[withdrawTransactionId]) {
            const txHash = state.transactionStack[withdrawTransactionId];
            setTransWithdrawStatus(state.transactions[txHash]?.status);
        }
    }, [stakeToPanelTransactionId, announceWithdrawTransactionId, withdrawTransactionId, state]);


    console.log("state", state);
    // console.log("transStakeToPanelStatus", transStakeToPanelStatus);
    // console.log("transAccounceWithdrawStatus", transAccounceWithdrawStatus);
    // console.log("transWithdrawStatus", transWithdrawStatus);

    const convertToGWei = (amount) => {
        return drizzle.web3.utils.toWei(amount, 'ether');
    };

    const onStakeToPanel = useCallback(async (data) => {
        dispatch(stakeToPanel(rootService,
            {
                from: userAddress,
                value: parseInt(convertToGWei(data?.amount)),
            }
        ));
    }, [drizzle]);

    const onWithdrawFromPanel = useCallback(async (data) => {
        dispatch(withdraw(rootService, convertToGWei(data.amount), userAddress,
            {
                // gasPrice: convertToGWei(data?.amount),
                from: userAddress
            }))
    }, [dispatch]);

    const onAnnounce = useCallback(async (data) => {
        dispatch(announceWithdrawal(rootService, convertToGWei(data.amount),
            {
                // gasPrice: convertToGWei(data?.amount),
                from: userAddress
            }))
    }, [dispatch]);


    return (
        <Row>
            <Col md={4}>
                <Button
                    width="100%"
                    type="full-width"
                    title={transStakeToPanelStatus === "pending"
                        ? <LoadingSpinner/>
                        : "Stake to Panel"}
                    handleButton={handleSubmit(onStakeToPanel)}
                />
                {transStakeToPanelStatus !== "success" ? null :
                    <TransResult>Transaction is successful</TransResult>
                }

            </Col>
            <Col md={4}>
                <Button
                    width="100%"
                    type="full-width"
                    title={transAccounceWithdrawStatus === "pending"
                        ? <LoadingSpinner/>
                        : "Announce"}
                    handleButton={handleSubmit(onAnnounce)}
                />
                {transAccounceWithdrawStatus !== "success" ? null :
                    <TransResult>Transaction is successful</TransResult>
                }
            </Col>
            <Col md={4}>
                <Button
                    width="100%"
                    type="full-width"
                    title={transWithdrawStatus === "pending"
                        ? <LoadingSpinner/>
                        : "Withdraw from Panel"}
                    handleButton={handleSubmit(onWithdrawFromPanel)}
                />
                {transWithdrawStatus !== "success" ? null :
                    <TransResult>Transaction is successful</TransResult>
                }
            </Col>
        </Row>
    );
}

ActionButtons.propTypes = {
    handleSubmit: PropTypes.func
};

export default ActionButtons;

