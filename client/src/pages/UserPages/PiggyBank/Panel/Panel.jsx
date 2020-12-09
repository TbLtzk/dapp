import React, {useEffect} from "react";
import CustomBlock from "../../../../components/Base/CustomBlock";
import {TextPanelSmallBlack, TextPanelSmallGrey, TextPanel, CustomBlockPanel} from "../styles";
import {useDispatch, useSelector} from "react-redux";
import {userAddressMetamask} from "../../../../store/selectors/user-inf";
import {setUserBalance} from "../../../../store/actions/action-creaters/q-piggy-bank";
import {userBalance} from "../../../../store/selectors/q-piggy-bank";

export default function Panel(props) {
    const userAddressL = useSelector(userAddressMetamask);
    const userBalanceL = useSelector(userBalance);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUserBalance(userAddressL));
    }, [])


    return (
        <CustomBlockPanel>
            <TextPanel onClick={() => test()}><span>Piggy Bank balance: </span><span>{userBalanceL}Q</span></TextPanel>
            <TextPanel><span>Q address balance: </span><span>565Q</span></TextPanel>
            <TextPanel type={'parentNode'}>
                <span>Voting Weigh</span>
                <TextPanelSmallGrey style={{margin: '0 8px 0 16px'}}>PiggyBank Voting Weight:</TextPanelSmallGrey>
                <TextPanelSmallBlack>4563Q</TextPanelSmallBlack>
                <TextPanelSmallGrey style={{margin: '0 16px'}}>|</TextPanelSmallGrey>
                <TextPanelSmallGrey>Voting Locking End:</TextPanelSmallGrey>
                <TextPanelSmallBlack style={{margin: '0 16px 0 8px'}}>12.03.2026 15:51 UTC</TextPanelSmallBlack>
                <TextPanelSmallGrey>Voting Status:</TextPanelSmallGrey>
                <TextPanelSmallBlack style={{marginLeft: '8px'}}>Root Node</TextPanelSmallBlack>
            </TextPanel>
        </CustomBlockPanel>
    );
}