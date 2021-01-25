import React, { useEffect, useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faClock } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import CustomTabsView from 'components/Base/Tabs/CustomTabsView';
import ListCardBody from 'components/Custom/PageLists/ListCardBody';
import PollDetail from 'pages/UserPages/QGovernance/components/ProposalsList/PollDetail';
import VoteBreakdown from 'pages/UserPages/QGovernance/components/ProposalsList/VoteBreakdown';

import { convertToMonthDayYear, remainDate } from 'func/convertDate';

import {
  BlockBody,
  CollapsedBody,
  Details,
  ToggleBtn,
  WrapToggleBlock,
} from 'components/Custom/PageLists/ListCardBody/styles';

import { Accordion, Col, Container, Row, useAccordionToggle } from 'react-bootstrap';
import moment from 'moment';

function CardBody(props) {
  const {
    id, vetoTime, votingTime, proposalType, proposalID, pollDetail,
    voteBreakdown, proposalsKind, contract
  } = props;
  const [remainTimeVoting, setRemainTimeVoting] = useState('');
  const [remainTimeVeto, setRemainTimeVeto] = useState(0);

  const tabsItems = useMemo(() => {
    return (
      [
        {
          label: 'poll-detail',
          title: 'Poll Detail',
          content: (
            <PollDetail pollDetail={pollDetail} proposalsKind={proposalsKind}/>
          )
        },
        {
          label: 'vote-breakdown',
          title: 'Vote Breakdown',
          content: (
            <VoteBreakdown voteBreakdown={voteBreakdown}/>
          )
        },
      ]
    );
  }, []);
  // const currentDate = new Date();
  // console.log('Date', currentDate);

  // useEffect(() => {
  // const remainVoting = remainDate(votingTime, currentDate);
  // const remainVeto = remainDate(vetoTime, currentDate);
  // setRemainTimeVoting(remainVoting);
  // setRemainTimeVeto(remainVeto);

  // },[currentDate, votingTime, vetoTime]);

  // console.log("window.location.origin",window.location.origin)

  return (
    <>
      <ListCardBody
        id={id}
        collapsedContent={
          <CustomTabsView
            tabsItems={tabsItems}
          />
        }
        onShareBtn={() => {}}
        // shareText={`${window.location.origin}/proposal/${contract}/${proposalID}`}
        shareText={`${window.location.origin}/q-governance/proposal/${contract}/${proposalID}`}
      >
        <Details md={4}>
          <div>
            <FontAwesomeIcon icon={faCalendarAlt}/>
            <span>Voting until: {convertToMonthDayYear(votingTime)}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCalendarAlt}/>
            <span>Veto Start: {convertToMonthDayYear(votingTime)}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCalendarAlt}/>
            <span>Veto until {convertToMonthDayYear(vetoTime)}</span>
          </div>

        </Details>
        <Details md={4}>
          <div>
            <FontAwesomeIcon icon={faClock}/>
            <span>Remaining Time for Voting: {remainDate(votingTime)}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faClock}/>
            <span>Remaining Time for Veto: {remainDate(vetoTime)}</span>
          </div>
        </Details>
        <Details md={4}>
          <p>Proposal ID: {proposalID}</p>
          {proposalType && <p>Proposal Type: {proposalType}</p>}
        </Details>

      </ListCardBody>
      {/*<BlockBody>*/}
      {/*  <Container fluid>*/}
      {/*    /!*<MainText>{mainText}</MainText>*!/*/}
      {/*    <Row>*/}
      {/*      <Col md={10}>*/}
      {/*        <Row>*/}
      {/*          <Details md={4}>*/}
      {/*            <div>*/}
      {/*              <FontAwesomeIcon icon={faCalendarAlt}/>*/}
      {/*              <span>Voting until: {convertToMonthDayYear(votingTime)}</span>*/}
      {/*            </div>*/}
      {/*            <div>*/}
      {/*              <FontAwesomeIcon icon={faCalendarAlt}/>*/}
      {/*              <span>Veto Start: {convertToMonthDayYear(votingTime)}</span>*/}
      {/*            </div>*/}
      {/*            <div>*/}
      {/*              <FontAwesomeIcon icon={faCalendarAlt}/>*/}
      {/*              <span>Veto until {convertToMonthDayYear(vetoTime)}</span>*/}
      {/*            </div>*/}

      {/*          </Details>*/}
      {/*          <Details md={4}>*/}
      {/*            <div>*/}
      {/*              <FontAwesomeIcon icon={faClock}/>*/}
      {/*              <span>Remaining Time for Voting: {remainTimeVoting}</span>*/}
      {/*              /!*<span>Remaining Time for Voting: {remainDate(votingTime)}</span>*!/*/}
      {/*            </div>*/}
      {/*            <div>*/}
      {/*              <FontAwesomeIcon icon={faClock}/>*/}
      {/*              <span>Remaining Time for Veto: {remainTimeVeto}</span>*/}
      {/*              /!*<span>Remaining Time for Veto: {remainDate(vetoTime)}</span>*!/*/}
      {/*            </div>*/}
      {/*          </Details>*/}
      {/*          <Details md={4}>*/}
      {/*            <p>Proposal ID: {proposalID}</p>*/}
      {/*            {proposalType && <p>Proposal Type: {proposalType}</p>}*/}
      {/*          </Details>*/}
      {/*        </Row>*/}
      {/*      </Col>*/}
      {/*      <WrapToggleBlock md={2}>*/}
      {/*        /!*<CustomToggle eventKey={id}/>*!/*/}
      {/*      </WrapToggleBlock>*/}
      {/*      <Col md={12}>*/}
      {/*        /!*<Accordion.Collapse eventKey={id}>*!/*/}
      {/*        /!*  <CollapsedBody>*!/*/}
      {/*        /!*    tabsItems={tabsItems}*!/*/}
      {/*        /!*  </CollapsedBody>*!/*/}
      {/*        /!*</Accordion.Collapse>*!/*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*  </Container>*/}
      {/*</BlockBody>*/}
    </>
  );
}

export default CardBody;

