import React, {useEffect} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";
import {useDispatch} from "react-redux";
import {stakeToPanel, announceWithdrawal, withdraw} from "store/actions/action-creaters/root-contract";

import {useForm} from "react-hook-form";

import {Row, Col, Form} from "react-bootstrap";

import FormInput from "components/Base/FormInput"
import Button from "components/Base/Button";
import RootService from "api/contracts/RootService";

import {
    WrapContainer, Headline, List, TextWrapBlack,
    TextWrapGrey, TotalText, WrapInput
} from "./styles"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function FormStaking() {
    const {register, errors, handleSubmit} = useForm();
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();
    const rootService = new RootService(drizzle);

    return (
        <WrapContainer>
            <Headline>Your account status</Headline>
            <List>
                <li>Member of Root Node Panel</li>
                <li>Or Not a Member of Root Node Panel</li>
            </List>
            <Row>
                <TextWrapGrey md={6}>
                    <p>
                        Stake in Panel (Q)
                    </p>
                </TextWrapGrey>
                <TextWrapBlack md={6}>
                    <p>
                        0Q
                    </p>
                </TextWrapBlack>
                <TextWrapGrey md={6}>
                    <p>
                        Personal Balance (Q)
                    </p>
                </TextWrapGrey>
                <TextWrapBlack md={6}>
                    <p>
                        180000Q
                    </p>
                </TextWrapBlack>
                <TotalText md={6}>
                    <p>
                        Amount (Q):
                    </p>
                </TotalText>
                <WrapInput md={6}>
                    <FormInput
                        name="amount"
                        type="number"
                        placeholder={"135 000"}
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
                        handleButton={() => {
                            console.log('Withdraw');
                            dispatch(withdraw(rootService, 20, "0x4a14D788D86D021670EBcecE1196631d66595984"))
                        }}
                    />
                </Col>
                <Col md={4}>
                    <Button
                        type="full-width"
                        title="Accounce"
                        handleButton={() => {
                            console.log('Accounce');
                            dispatch(announceWithdrawal(rootService, 30))
                        }}
                    />
                </Col>
            </Row>


        </WrapContainer>
    );
}

export default FormStaking;

