import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import CustomBlock from "../../../../components/Base/CustomBlock";
import {Headline, TextWrapGrey} from "../styles";
import FormInput from "../../../../components/Base/FormInput";
import {useForm} from "react-hook-form";
import Button from "../../../../components/Base/Button";
import {useDispatch, useSelector} from "react-redux";
import {setClaimReward, setDepositCall, setWithdrawCall} from "../../../../store/actions/action-creaters/q-piggy-bank";
import {userAddressMetamask} from "../../../../store/selectors/user-inf";


export default function ManageBalance(props) {
    const { register: reg2, handleSubmit: submit2, errors: err2 } = useForm();
    const { register: reg3, handleSubmit: submit3, errors: err3 } = useForm();

    const dispatch = useDispatch();
    const address = useSelector(userAddressMetamask);

    function claimable() {
        dispatch(setClaimReward(address));
    }

    function setDepositL(formData) {
        dispatch(setDepositCall(address, formData.amountQ));
    }

    function withdrawL(formData) {
        dispatch(setWithdrawCall(address, formData.amountQ));
    }



    return (
        <CustomBlock>
            <Headline>Manage balance</Headline>
            <Row>
                <Col xs={8}>
                    <TextWrapGrey><span>Claimable Saving Reward</span><span>0Q</span></TextWrapGrey>
                </Col>
                <Col>
                    <Button
                        type="outline"
                        title="Claim"
                        width={'100%'}
                        handleButton={() => claimable()}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <TextWrapGrey>Transfer into PiggyBank</TextWrapGrey>
                </Col>
                <Col xs={8}>
                    <FormInput
                        name="amountQ"
                        type="number"
                        placeholder={"666Q"}
                        ref={reg2({required: "Field is required!", pattern: /[0-9]/i })}
                        valid={err2.amountQ?.message}
                    />
                </Col>
                <Col>
                    <Button
                        type="outline"
                        title="Transfer"
                        width={'100%'}
                        handleButton={submit2(setDepositL)}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <TextWrapGrey>Withdraw from PiggyBank</TextWrapGrey>
                </Col>
                <Col xs={8}>
                    <FormInput
                        name="amountQ"
                        type="number"
                        placeholder={"666Q"}
                        ref={reg3({required: "Field is required!"})}
                        valid={err3.amountQ?.message}
                    />
                </Col>
                <Col>
                    <Button
                        type="outline"
                        title="Withdraw"
                        width={'100%'}
                        handleButton={submit3(withdrawL)}
                    />
                </Col>
            </Row>
        </CustomBlock>
    );
}