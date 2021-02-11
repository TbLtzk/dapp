import React, { useMemo, useState } from 'react';
import { fN } from 'func/useful';
import { useSelector, useDispatch } from 'react-redux';
import { votingLockingEnd, votingWeight } from 'store/selectors/q-piggy-bank';
import { onChangeProposalTab, onSetActiveTab } from 'store/actions/action-creaters/voting/proposals';
import { fromSolDateFormattingT1 } from 'func/date';

import { useHistory } from 'react-router-dom';

import ButtonsGroupTabs from 'components/Base/Tabs/ButtonsGroupTabs';
import CreateQProposalBtn from './components/CreateQProposalBtn';
import References from 'components/Custom/PageLists/SidebarCards/References';
import Button from 'components/Base/Buttons/Button';
import TabContent from './components/TabContent';
import PageWrap from 'components/Base/PageWrap';
import Stats from 'components/Custom/PageLists/SidebarCards/Stats';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import { Row, Col } from 'react-bootstrap';
import { WrapBtn, WrapTabs } from 'components/Custom/PageLists/styles';

function QGovernance() {
  const history = useHistory();
  const userVotingWeight = fN(useSelector(votingWeight));
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));
  const [activeTab, setActiveTab] = useState('q-proposals');
  const dispatch = useDispatch();

  const statsData = useMemo(() => {
    return (
      [
        {
          title: 'PiggyBank Voting Weight (Q)',
          value: userVotingWeight + ' Q',
        },
        {
          title: 'Voting Locking End',
          value: userLockingEnd,
        },
        {
          title: 'Voting Status',
          value: <VoterStatus/>,
        },
      ]
    );
  }, [userVotingWeight, userLockingEnd]);

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
              console.log("click");
              dispatch(onChangeProposalTab());
              dispatch(onSetActiveTab(key))
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
    </PageWrap>
  );
}

export default QGovernance;

