import React, { useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';
import CreateQProposalBtn from './components/CreateQProposalBtn';
import References from 'components/Custom/PageLists/References';
import Button from 'components/Base/Buttons/Button';
import TabContent from './components/TabContent';
import PageWrap from 'components/Base/PageWrap';
import VotingStats from './VotingStats';

import { WrapBtn, WrapTabs } from 'components/Custom/PageLists/styles';

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
    <PageWrap>
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
          <VotingStats/>
          <References type="voting"/>
        </Col>
      </Row>
    </PageWrap>
  );
}

export default QGovernance;

