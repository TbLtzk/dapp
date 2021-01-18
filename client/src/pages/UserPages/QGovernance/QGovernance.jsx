import React, { useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';

import CreateQProposalBtn from './components/CreateQProposalBtn';
import Stats from 'components/Custom/PageLists/Stats';
import References from 'components/Custom/PageLists/References';

import { WrapTabs, WrapBtn } from './styles';
import Button from 'components/Base/Buttons/Button';
import { useHistory } from 'react-router-dom';
import TabContent from './components/TabContent';

function QGovernance() {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState('q-proposals');

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

  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'q-proposals',
          title: 'Q Proposals',
          content: (
            <WrapTabs>
              <TabContent activeTab={activeTab}/>
            </WrapTabs>
          )
        },
        {
          label: 'q-root-node-panel',
          title: 'Q Root Node Panel',
        },
        {
          label: 'q-expert-proposals',
          title: 'Q Expert Proposals',
        },
        {
          label: 'slashing-proposals',
          title: 'Slashing Proposals',
        },
      ]
    );
  }, [activeTab]);

  return (
    <Row>
      <Col md={8}>
        <ButtonsGroupTabs
          tabsItems={tabsItems}
          tabsHandler={(key) => {
            setActiveTab(key);
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
                state: {
                  activeTab: activeTab,
                  numberOfProposals: 0
                }
              });
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

