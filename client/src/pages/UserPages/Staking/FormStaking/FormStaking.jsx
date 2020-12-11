import React, {useEffect, useState, useMemo} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";
import {getRootNodeStakes} from "store/actions/action-creaters/root-contract";
import {isUserRootNode, loadingCheckingRootNode, rootNodeStake} from "store/selectors/root-contract"
import {userAddressMetamask} from "store/selectors/user-inf"

import {useForm} from "react-hook-form";

import {Row} from "react-bootstrap";

import {roundBalance} from "func/balance"
import CustomBlock from "components/Base/CustomBlock"
import FormInput from "components/Base/FormInput"
import ActionButtons from "pages/UserPages/Staking/FormStaking/ActionButtons";
import RootService from "api/contracts/RootService";

import {
    Headline, List, TextWrapBlack,
    TextWrapGrey, TotalText, WrapInput
} from "./styles"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function FormStaking() {
    const {register, errors, handleSubmit} = useForm();
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();
    const state = useDrizzleState(state => state);
    const rootService = new RootService(drizzle);
    const [userBalance, setUserBalance] = useState(null);

    const isUserRoot = useSelector(isUserRootNode);
    const loadingCheckingRoot = useSelector(loadingCheckingRootNode);
    const userAddress = useSelector(userAddressMetamask);
    const amountNodeStake = useSelector(rootNodeStake);

    useEffect(() => {
        if (userAddress) {
            // if (userAddress && isUserRoot) {
            dispatch(getRootNodeStakes(rootService, userAddress))
        }
    }, [userAddress, isUserRoot, dispatch, state]);

    useEffect(() => {
        if (drizzle) {
            drizzle.web3.eth.getBalance(userAddress, (err, balance) => {
                const userBalance = drizzle.web3.utils.fromWei(balance, "ether");
                setUserBalance(roundBalance(userBalance));
            });
        }
    }, [state]);

    const handleBtn = useMemo(() => {
        return handleSubmit
    }, [handleSubmit]);

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
                    <p>Stake in Panel (Q)</p>
                </TextWrapGrey>
                <TextWrapBlack md={6}>
                    <p>{amountNodeStake + "Q"}</p>
                    {/*<p>{!isUserRoot ? "0Q" : amountNodeStake + "Q"}</p>*/}
                </TextWrapBlack>
                <TextWrapGrey md={6}>
                    <p>Personal Balance (Q)</p>
                </TextWrapGrey>
                <TextWrapBlack md={6}>
                    <p>{userBalance ? userBalance : 0}Q</p>
                </TextWrapBlack>
                <TotalText md={7}>
                    <p>Amount (Q):</p>
                </TotalText>
                <WrapInput md={5}>
                    <FormInput
                        name="amount"
                        type="number"
                        align="right"
                        // placeholder={"135 000"}
                        ref={register({required: "Field is required!"})}
                        valid={errors?.amount?.message}
                        onChange={() => {}}
                    />
                </WrapInput>
            </Row>
            <ActionButtons
                handleSubmit={handleBtn}
            />
        </CustomBlock>
    );
}

export default FormStaking;

