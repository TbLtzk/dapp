import React, {useEffect, useState} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";

import {useDispatch, useSelector} from "react-redux";
import {getRootMembersData} from "store/actions/action-creaters/root-contract"
import {
    rootMembersData, rootMembersAmountStakes, loadingRootMembers, errorM,
    isUserRootNode, loadingCheckingRootNode
} from "store/selectors/root-contract"

import {Container, Row, Col} from "react-bootstrap";

import ContractRegistryService from "api/contracts/ContractRegistryService"
import RootService from "api/contracts/RootService"
import PieChartCustom from "components/Base/PieChartCustom"
import ButtonLinkArrow from "components/Base/Buttons/ButtonLinkArrow";
import RootNodeTable from "./RootNodeTable"
import LoadingSpinner from "components/Base/LoadingSpinner";

import {
    H5Headline, ContainerWrap, HeadlineWrap, TotalWrap,
    BottomText
} from "./styles"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function RootNodePanel(props) {
    const {type, bottom} = props;
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const contractRegistry = new ContractRegistryService(drizzle);
    const rootService = new RootService(drizzle);
    // const [rootMembers, setRootMembers] = useState(null);
    // const [rootMembersAllData, setRootMembersAllData] = useState([]);


    useEffect(async () => {
        // if (drizzle.contracts.Root) {
        // rootService.getRootCalc().then((data) => {
        //     console.log('getRootNodeAllData', data);
        //     setRootMembersAllData(data)
        //
        // });
        // contractRegistry.getAddress().then((address) => {
        //     // console.log('get root contract address', address);
        // });
        // rootService.checkMemberIsRoot(state.accounts[0]).then((isRootMember) => {
        //     // console.log('isRootMember', isRootMember);
        // });
        // // rootService.checkMemberIsRoot('0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7').then((isRootMember) => {console.log('isRootMember', isRootMember);});
        // rootService.getMemberCount().then((memberCount) => {
        //     // console.log('memberCount', memberCount);
        // });
        // rootService.getRootNodeStake('0x6A39B688d591Ea00C9EA69658438794204B5cC62').then((nodeStake) => {
        //     // console.log('getRootNodeStake', nodeStake);
        // });

        // }

    }, [drizzle.contracts.Root]);


    const rootMembersArray = useSelector(rootMembersData);
    const loading = useSelector(loadingRootMembers);
    const errorMessage = useSelector(errorM);
    const rootAmountStakes = useSelector(rootMembersAmountStakes);

    const isUserRoot = useSelector(isUserRootNode);
    const loadingCheckingRoot = useSelector(loadingCheckingRootNode);
    // console.log('rootMembersArray', rootMembersArray);
    // console.log('rootAmountStakes', rootAmountStakes);
    // console.log('drizzle', drizzle);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRootMembersData(rootService))
    }, [dispatch]);

    return (
        <ContainerWrap>
            <Container fluid>
                <Row>
                    {
                        loading ? <Col xs={12}><LoadingSpinner/></Col> :
                            errorMessage ? <Col xs={12}><p>No roots node</p></Col> :
                                <>
                                    <Col xs={5}>
                                    </Col>
                                    <Col xs={7}>
                                        <HeadlineWrap>
                                            <H5Headline>Root Node Panel</H5Headline>
                                            {type !== "with-total" ? null :
                                                <TotalWrap>Total Stake: {rootAmountStakes + "Q"}</TotalWrap>}
                                        </HeadlineWrap>
                                    </Col>
                                    <Col xs={5}>
                                        <PieChartCustom/>
                                    </Col>
                                    <Col xs={7}>
                                        <RootNodeTable/>
                                        {
                                            !bottom ? null :
                                                <Row>
                                                    <Col xs={7}>
                                                        <BottomText>Create a proposal to enter
                                                            or leave the Root Node Panel</BottomText>
                                                    </Col>
                                                    <Col xs={5}>
                                                        <ButtonLinkArrow
                                                            title="Go to Governance"
                                                            path="/q-governance"
                                                        />
                                                    </Col>
                                                </Row>
                                        }
                                    </Col>

                                </>
                    }
                </Row>
            </Container>
        </ContainerWrap>
    );
}

export default RootNodePanel;

