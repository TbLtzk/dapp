import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import CustomBlock from "../../../../components/Base/CustomBlock";
import {Headline, TextWrapGrey} from "../styles";
import FormInput from "../../../../components/Base/FormInput";
import {useForm} from "react-hook-form";
import Button from "../../../../components/Base/Button";


export default function LockCoin(props) {
    const { register, handleSubmit, errors } = useForm();

    return (
        <CustomBlock>
            <Headline>Lock Your Coins for Voting</Headline>
            <Row>
                <TextWrapGrey xs={8}><span>Claimable Saving Reward</span><span>00.00Q</span></TextWrapGrey>
                <Col>
                    <Button
                        type="outline"
                        title="Lock"
                        width={'100%'}
                    />
                </Col>
            </Row>
            <Row>
                <TextWrapGrey xs={12}>Extend currently locked balance until</TextWrapGrey>
                <Col xs={8}>
                    <FormInput
                        name="amount"
                        placeholder={"135 000"}
                        ref={register({required: "Field is required!"})}
                        valid={errors.amount?.message}
                    />
                </Col>
                <Col>
                    <Button
                        type="outline"
                        title="Extend"
                        width={'100%'}
                    />
                </Col>
            </Row>
            <Row>
                <TextWrapGrey xs={12}>Unlock Amount</TextWrapGrey>
                <Col xs={8}>
                    <FormInput
                        name="amount"
                        // type="number"
                        placeholder={"135 000"}
                        ref={register({required: "Field is required!"})}
                        valid={errors.amount?.message}
                        onChange={() => {}}
                    />
                </Col>
                <Col>
                    <Button
                        type="outline"
                        title="Unlock"
                        width={'100%'}
                    />
                </Col>
            </Row>
        </CustomBlock>
    );
}