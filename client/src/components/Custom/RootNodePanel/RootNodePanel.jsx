import React, {useEffect, useState} from "react";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {newContextComponents} from "@drizzle/react-components";

import {Container, Row, Col} from "react-bootstrap";

import ContractRegistryService from "api/contracts/ContractRegistryService"
import RootService from "api/contracts/RootService"
import TableView from "components/Base/TableView"
import PieChartCustom from "components/Base/PieChartCustom"

import {tableHeader, circles} from "./constants"

import {H5Headline, RootNodePanelWrap, Circle, ContainerWrap} from "./styles"
import ContractTest from "components/Custom/UserData/ContractTest";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const {AccountData} = newContextComponents;

function RootNodePanel() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const contractRegistry = new ContractRegistryService(drizzle);
    const rootService = new RootService(drizzle);

    const [rootMembers, setRootMembers] = useState(null);
    const [rootMembersAllData, setRootMembersAllData] = useState([]);


    useEffect(async () => {
        if (drizzle.contracts) {
            contractRegistry.getAddress().then((address) => {
                console.log('get root contract address', address);
            });
            const rootMembersData = [];
            const rootStake = [];
            rootService.getRootMembers().then((members) => {
                console.log('get root members', members);
                setRootMembers(members);
                members.map((member, i) => {
                    rootService.getRootNodeStake(member).then((nodeStake) => {
                        console.log('getRootNodeStake inside', nodeStake, member);
                        rootStake.push(nodeStake);
                        rootMembersData.push(
                            {
                                address: member,
                                //TODO: custom data because from back get 0 value of stake
                                stakeAmount: (i+1) * 4,
                                // stakeAmount: nodeStake,
                                share: 0
                            }
                        )
                    });
                });

                console.log('rootMembersData',rootMembersData);
                // console.log('rootStake',rootStake);
                // console.log('rootMembersDataLength',!rootMembersData);
                // // if (rootMembersData.length !== 0){
                //     let result = rootStake.reduce((sum, current) => sum + current, 0);
                //     console.log('stakeSum', result);
                // // }
                setRootMembersAllData(rootMembersData);
            });
            rootService.getRootCalc().then((data) => {
                console.log('getRootNodeAllData', data);

            });


            rootService.checkMemberIsRoot(state.accounts[0]).then((isRootMember) => {
                console.log('isRootMember', isRootMember);
            });
            // rootService.checkMemberIsRoot('0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7').then((isRootMember) => {console.log('isRootMember', isRootMember);});
            rootService.getMemberCount().then((memberCount) => {
                console.log('memberCount', memberCount);
            });
            rootService.getRootNodeStake('0x6A39B688d591Ea00C9EA69658438794204B5cC62').then((nodeStake) => {
                // console.log('getRootNodeStake', nodeStake);
            });

        }

    }, [drizzle.contracts]);

    console.log(drizzle.contracts);
    console.log("rootMembersAllData", rootMembersAllData);
    console.log("rootMembersAllDataCheck", !rootMembersAllData);

    return (
        <ContainerWrap>
            <Container fluid>
                <Row>
                    <Col xs={5}>
                    </Col>
                    <Col xs={7}>
                        <H5Headline>Root Node Panel</H5Headline>
                    </Col>
                    <Col xs={5}>
                        <PieChartCustom/>
                    </Col>
                    <Col xs={7}>

                        <RootNodePanelWrap>
                            {

                                rootMembersAllData.length === 0 ? null :
                                <TableView
                                    header={tableHeader}
                                    body={
                                        rootMembersAllData.length === 0 ? null :
                                            rootMembersAllData.map((member, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <Circle
                                                            className={"circleNum "}
                                                            color={circles[i]}
                                                        >

                                                        </Circle>
                                                        {member.address.slice(0, 14) + '...'}
                                                    </td>
                                                    <td>{member.stakeAmount} Q</td>
                                                    <td>{member.share}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                />
                            }
                        </RootNodePanelWrap>
                    </Col>
                </Row>
            </Container>
        </ContainerWrap>
    );
}

export default RootNodePanel;

