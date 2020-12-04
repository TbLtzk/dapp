import React from "react";
import {useSelector} from "react-redux";
import {rootMembersData} from "store/selectors/root-contract"
import {userAddressMetamask} from "store/selectors/user-inf";

import TableView from "components/Base/TableView";

import {circles, tableHeader} from "../constants";

import {Circle, RootNodePanelWrap, MemberAddress} from "./styles";

function RootNodeTable() {
    const rootMembersArray = useSelector(rootMembersData);
    const userAddress = useSelector(userAddressMetamask);

    return (
        <RootNodePanelWrap>
            {
                rootMembersArray?.length === 0 ? <p>No roots data</p> :
                    <TableView
                        header={tableHeader}
                        body={
                            rootMembersArray?.length === 0 ? null :
                                // rootMembersAllData.length === 0 ? null :
                                //     rootMembersAllData.map((member, i) => {
                                rootMembersArray.map((member, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <Circle
                                                    className={"circleNum "}
                                                    color={circles[i]}
                                                >

                                                </Circle>
                                                <MemberAddress
                                                    color={userAddress === member.address ? "highlight" : "default"}
                                                >
                                                    {member.address.slice(0, 14) + '...'}
                                                </MemberAddress>
                                            </td>
                                            <td>{member.stakeAmount} Q</td>
                                            <td>{member.share + '%'}</td>
                                        </tr>
                                    )
                                })
                        }
                    />
            }

        </RootNodePanelWrap>
    );
}

export default RootNodeTable;

