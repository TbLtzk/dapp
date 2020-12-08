import React, {useMemo} from "react";

import {Accordion, Col, Container, Row, useAccordionToggle} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faChevronDown, faClock} from "@fortawesome/free-solid-svg-icons";

import CustomTabsView from "components/Base/Tabs/CustomTabsView";
import PollDetail from "pages/UserPages/QGovernance/components/ProposalsList/PollDetail";
import VoteBreakdown from "pages/UserPages/QGovernance/components/ProposalsList/VoteBreakdown";

import {convertToMonthDayYear, remainDate} from "func/convertDate";

import {BlockBody, CollapsedBody, Details, MainText, WrapToggleBlock, ToggleBtn} from "./styles";

function CustomToggle({eventKey}) {
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
    });

    return (
        <ToggleBtn
            type="button"
            onClick={decoratedOnClick}
        >
            <span>View Details</span>
            <FontAwesomeIcon icon={faChevronDown}/>

        </ToggleBtn>
    );
}

function CardBody(props) {
    const {id, vetoTime, votingTime, proposalType, proposalID, pollDetail, voteBreakdown} = props;

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "poll-detail",
                    title: "Poll Detail",
                    content: (
                        <PollDetail pollDetail={pollDetail}/>
                    )
                },
                {
                    label: "vote-breakdown",
                    title: "Vote Breakdown",
                    content: (
                        <VoteBreakdown voteBreakdown={voteBreakdown}/>
                    )
                },
            ]
        )
    }, []);

    return (
        <BlockBody>
            <Container fluid>
                {/*<MainText>{mainText}</MainText>*/}
                <Row>
                    <Col md={10}>
                        <Row>
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
                                    <span>Remining Time for Veto: {remainDate(vetoTime)}</span>
                                </div>
                            </Details>
                            <Details md={4}>
                                <p>Proposal ID: {proposalID}</p>
                                {proposalType && <p>Proposal Type: {proposalType}</p>}
                            </Details>
                        </Row>
                    </Col>
                    <WrapToggleBlock md={2}>
                        <CustomToggle eventKey={id}/>
                    </WrapToggleBlock>
                    <Col md={12}>
                        <Accordion.Collapse eventKey={id}>
                            <CollapsedBody>
                                <CustomTabsView
                                    tabsItems={tabsItems}
                                />
                            </CollapsedBody>
                        </Accordion.Collapse>
                    </Col>
                </Row>
            </Container>

        </BlockBody>
    );
}

export default CardBody;

