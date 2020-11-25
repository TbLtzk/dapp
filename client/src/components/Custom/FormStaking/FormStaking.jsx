import React, {useEffect, useCallback} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";
import {useDispatch, useSelector} from "react-redux";
import {stakeToPanel, announceWithdrawal, withdraw,
    getRootNodeStakes} from "store/actions/action-creaters/root-contract";
import {isUserRootNode, loadingCheckingRootNode, rootNodeStake} from "store/selectors/root-contract"
import {balanceMetamask, userAddressMetamask} from "store/selectors/user-inf"

import {useForm} from "react-hook-form";

import {Row, Col, Form} from "react-bootstrap";

import CustomBlock from "components/Base/CustomBlock"
import FormInput from "components/Base/FormInput"
import Button from "components/Base/Button";
import RootService from "api/contracts/RootService";

import {
    Headline, List, TextWrapBlack,
    TextWrapGrey, TotalText, WrapInput
} from "./styles"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function FormStaking() {
    const {register, errors, handleSubmit} = useForm();
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();
    const rootService = new RootService(drizzle);

    const isUserRoot = useSelector(isUserRootNode);
    const loadingCheckingRoot = useSelector(loadingCheckingRootNode);
    const userBalance = useSelector(balanceMetamask);
    console.log("isUserRoot", isUserRoot);
    const userAddress = useSelector(userAddressMetamask);
    const amountNodeStake = useSelector(rootNodeStake);
    console.log("amountNodeStake", amountNodeStake);

    useEffect(() => {
        if (userAddress && isUserRoot) {
            dispatch(getRootNodeStakes(rootService, userAddress))
        }
    }, [userAddress, isUserRoot, dispatch]);

    const onWithdrawFromPanel = useCallback((data) => {
        console.log('Withdraw', data);
        dispatch(withdraw(rootService, parseInt(data.amount), userAddress))
    }, [dispatch]);

    const onAccounce = useCallback((data) => {
        console.log('announceWithdrawal', data);
        dispatch(announceWithdrawal(rootService, parseInt(data.amount)))
    }, [dispatch]);


    return (
        <CustomBlock>
            <Headline>Your account status</Headline>
            <List>
                {loadingCheckingRoot ? null :
                    isUserRoot
                        ? <li>Member of Root Node Panel</li>
                        : <li>Not a Member of Root Node Panel</li>
                }
            </List>
            <Row>
                <TextWrapGrey md={6}>
                    <p>
                        Stake in Panel (Q)
                    </p>
                </TextWrapGrey>
                <TextWrapBlack md={6}>
                    <p>
                        {

                            !isUserRoot ? "0Q" : amountNodeStake + "Q"

                        }

                    </p>
                </TextWrapBlack>
                <TextWrapGrey md={6}>
                    <p>
                        Personal Balance (Q)
                    </p>
                </TextWrapGrey>
                <TextWrapBlack md={6}>
                    <p>
                        {userBalance ? userBalance : 0}Q
                    </p>
                </TextWrapBlack>
                <TotalText md={7}>
                    <p>
                        Amount (Q):
                    </p>
                </TotalText>
                <WrapInput md={5}>
                    <FormInput
                        name="amount"
                        type="text"
                        align="right"
                        // placeholder={"135 000"}
                        ref={register({required: "Field is required!"})}
                        valid={errors?.amount?.message}
                        onChange={() => {
                        }}
                    />
                </WrapInput>
            </Row>
            <Row>
                <Col md={4}>
                    <Button
                        type="full-width"
                        title="Stake to Panel"
                        handleButton={() => {
                            console.log('Stake to Panel');
                            dispatch(stakeToPanel(rootService))
                        }}
                    />
                </Col>
                <Col md={4}>
                    <Button
                        type="full-width"
                        title="Withdraw from Panel"
                        handleButton={handleSubmit(onWithdrawFromPanel)}
                    />
                </Col>
                <Col md={4}>
                    <Button
                        type="full-width"
                        title="Accounce"
                        handleButton={handleSubmit(onAccounce)}
                    />
                </Col>
            </Row>
        </CustomBlock>
    );
}

export default FormStaking;

