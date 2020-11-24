import React from "react";
import {useSelector} from "react-redux";
import {rootMembersData} from "store/selectors/root-contract"

import TableView from "components/Base/TableView";

import {circles, tableHeader} from "../constants";

import {Circle, RootNodePanelWrap} from "./styles";

function RootNodeTable() {
    const rootMembersArray = useSelector(rootMembersData);

    return (
        <RootNodePanelWrap>
            {
                rootMembersArray.length === 0 ? <p>No roots data</p> :
                    <TableView
                        header={tableHeader}
                        body={
                            rootMembersArray.length === 0 ? null :
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
                                                {member.address.slice(0, 14) + '...'}
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

