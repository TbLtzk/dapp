import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import TableView from 'components/Base/TableView';
import PieChartTwoItem from './PieChartTwoItem';

import {
  Text, Title, SubTitle, Descr, WrapBlock, ColorTitle, WrapColorDescr, CircleColor,
  CircleDescrData, WrapResult
} from './styles';
import colors from 'constants/colors';

const requiredQuorum = 50;
const currentQuorum = 50;

function VoteBreakdown(props) {
  const { voteBreakdown } = props;
  // console.log('voteBreakdown', voteBreakdown);

  return (
    <div>
      <Title>Result</Title>
      <WrapResult>
        <Col md={4}>
          <SubTitle>Vote Results</SubTitle>
          <Descr>Majority Requirement; {voteBreakdown.requiredMajority}%</Descr>
          <WrapBlock>
            <PieChartTwoItem
              data={[{
                name: 'For',
                value: 70
              },
                {
                  name: 'Against',
                  value: 30
                },]}
            />
            <WrapColorDescr>
              <ColorTitle><CircleColor color={colors.main}/>For</ColorTitle>
              <ColorTitle><CircleColor color={colors.circleWhite}/>Against</ColorTitle>
            </WrapColorDescr>

          </WrapBlock>
          <CircleDescrData>- For: {voteBreakdown.votesFor}
            {voteBreakdown.contract === 'EPQFI_ParametersVoting' || voteBreakdown.contract === 'EPDR_ParametersVoting' ||
            voteBreakdown.contract === 'RootNodesSlashingVoting' || voteBreakdown.contract === 'ValidatorsSlashingVoting' ||
            voteBreakdown.contract === 'EmergencyUpdateVoting' ? null : 'Q'}
          </CircleDescrData>
          {/*<CircleDescrData>- For: {voteBreakdown.currentMajority}%</CircleDescrData>*/}
          <CircleDescrData>- Against: {voteBreakdown.votesAgainst}
            {voteBreakdown.contract === 'EPQFI_ParametersVoting' || voteBreakdown.contract === 'EPDR_ParametersVoting' ||
            voteBreakdown.contract === 'RootNodesSlashingVoting' || voteBreakdown.contract === 'ValidatorsSlashingVoting' ||
            voteBreakdown.contract === 'EmergencyUpdateVoting' ? null : 'Q'}
            {/*<CircleDescrData>- Against: {(voteBreakdown.requiredMajority) - (voteBreakdown.currentMajority)}%*/}
          </CircleDescrData>
        </Col>
        <Col md={4}>
          <SubTitle>Constitution Check</SubTitle>
          <Descr>Objection Requirement: {voteBreakdown.vetoThreshold}%</Descr>
          <WrapBlock>
            <PieChartTwoItem
              data={[{
                name: 'For',
                value: 10
              },
                {
                  name: 'Against',
                  value: 90
                },]}
            />
            <WrapColorDescr>
              <ColorTitle><CircleColor color={colors.main}/>Objection</ColorTitle>
              <ColorTitle><CircleColor color={colors.circleWhite}/>No Vote</ColorTitle>
            </WrapColorDescr>
          </WrapBlock>
          <CircleDescrData>- Root Nodes Objections {voteBreakdown.currentVetoPercentage}</CircleDescrData>
        </Col>
        <Col md={4}>
          <SubTitle>Q Community Veto</SubTitle>
          <Descr>Veto Requirement: 0%</Descr>
          <WrapBlock>
            <PieChartTwoItem
              data={[{
                name: 'For',
                value: 25
              },
                {
                  name: 'Against',
                  value: 75
                },]}
            />
            <WrapColorDescr>
              <ColorTitle><CircleColor color={colors.main}/>For</ColorTitle>
              <ColorTitle><CircleColor color={colors.circleWhite}/>Against</ColorTitle>
            </WrapColorDescr>
          </WrapBlock>
          <CircleDescrData>- For: 0</CircleDescrData>
          <CircleDescrData>- Against: 0</CircleDescrData>
        </Col>
      </WrapResult>
      <Title>Vote Requirements</Title>
      <Row>
        <Col md={6}>
          <TableView
            body={
              <>
                <tr>
                  <td>
                    <Text
                      highlight={voteBreakdown.requiredQuorum === voteBreakdown.currentQuorum}>
                      Quorum: {voteBreakdown.requiredQuorum}%
                    </Text>
                  </td>
                  <td>
                    <Text highlight={voteBreakdown.requiredQuorum === voteBreakdown.currentQuorum}>
                      Current Quorum: {voteBreakdown.currentQuorum}%
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td><Text>Root Node Objection
                    Requirement: {voteBreakdown.vetoThreshold}%</Text>
                  </td>
                  <td><Text>Current Root Node
                    Objection: {voteBreakdown.currentVetoPercentage}%</Text>
                  </td>
                </tr>
                <tr>
                  <td><Text>Veto Requirement: 0%</Text></td>
                  <td><Text>Current Veto Share: 0%</Text></td>
                </tr>
              </>
            }
          />
        </Col>

      </Row>
    </div>
  );
}

export default VoteBreakdown;

