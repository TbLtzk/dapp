import React, {useMemo, useState} from "react";
import {Row, Col} from "react-bootstrap";

import ButtonTabs from "components/Base/Tabs/ButtonTabs";
import QProposals from "./MainTabs/QProposals";
import QRootNodePanel from "./MainTabs/QRootNodePanel";
import SlashingProposals from "./MainTabs/SlashingProposals";
import QExpertProposals from "./MainTabs/QExpertProposals";

import CreateQProposalBtn from "./components/CreateQProposalBtn";
import Stats from "components/Custom/PageLists/Stats";
import References from "components/Custom/PageLists/References";

import {WrapTabs, WrapBtn} from "./styles";
import Button from "components/Base/Buttons/Button";
import {useHistory} from "react-router-dom";

function QGovernance() {
    const history = useHistory();

  const statsData = useMemo(() => {
    return (
      [
        {
          title: 'PiggyBank Voting Weight (Q)',
          value: '4563Q',
        },
        {
          title: 'Voting Locking End',
          value: '3rd December 2026 15:51 UTC',
        },
        {
          title: 'Voting Status',
          value: 'Root Node',
        },
      ]
    );
  }, []);

  const currentDate = new Date();
  console.log('Date', currentDate);


  const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "q-proposals",
                    title: "Q Proposals",
                    content: (
                        <WrapTabs>
                            <QProposals currentDate={currentDate}/>
                        </WrapTabs>
                    )
                },
                {
                    label: "q-root-node-panel",
                    title: "Q Root Node Panel",
                    content: (
                        <WrapTabs>
                            <QRootNodePanel/>
                        </WrapTabs>
                    )
                },
                {
                    label: "q-expert-proposals",
                    title: "Q Expert Proposals",
                    content: (
                        <WrapTabs>
                            <QExpertProposals/>
                        </WrapTabs>
                    )
                },
                {
                    label: "slashing-proposals",
                    title: "Slashing Proposals",
                    content: (
                        <WrapTabs>
                            <SlashingProposals/>
                        </WrapTabs>
                    )
                },
            ]
        )
    }, [currentDate]);

    const [activeTab, setActiveTab] = useState(tabsItems[0]?.label);

    return (
        <Row>
            <Col md={8}>
                <ButtonTabs
                    tabsItems={tabsItems}
                    tabsHandler={(key) => {
                        setActiveTab(key)
                    }}
                />
                <WrapBtn>
                    <Button
                        title="View ended proposals"
                        type="white"
                        width="100%"
                        handleButton={() => {
                            history.push({
                                pathname: '/ended-proposals',
                                state: {activeTab: activeTab, numberOfProposals: 0}
                            })
                        }}
                    />
                </WrapBtn>
            </Col>
            <Col md={4}>
                <CreateQProposalBtn activeTab={activeTab}/>
                <Stats statsData={statsData} type="Voting"/>
                <References type="voting"/>
            </Col>
        </Row>
    );
}

export default QGovernance;

