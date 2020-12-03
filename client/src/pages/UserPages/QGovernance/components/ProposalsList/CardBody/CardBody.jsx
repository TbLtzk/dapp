import React, {useMemo} from "react";

import {Accordion, Col, Container, Row, useAccordionToggle} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faChevronDown, faClock} from "@fortawesome/free-solid-svg-icons";

import CustomTabsView from "components/Base/Tabs/CustomTabsView";
import PollDetail from "pages/UserPages/QGovernance/components/ProposalsList/PollDetail";
import VoteBreakdown from "pages/UserPages/QGovernance/components/ProposalsList/VoteBreakdown";

import {BlockBody, CollapsedBody, Details, MainText, WrapToggleBlock, ToggleBtn} from "pages/UserPages/QGovernance/components/ProposalsList/CardBody/styles";

function CustomToggle({eventKey}) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>{});

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
    const {id, mainText, date, time, proposalID, pollDetail, voteBreakdown} = props;


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
                <Row>
                    <Col md={10}>
                        <MainText>{mainText}</MainText>
                        <Row>
                            <Details md={4}>
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                                <span>{date}</span>
                            </Details>
                            <Details md={4}>
                                <FontAwesomeIcon icon={faClock}/>
                                <span>{time}</span>
                            </Details>
                            <Details md={4}>
                                <span>Proposal ID: {proposalID}</span>
                            </Details>
                            <Col md={10}>
                                <Accordion.Collapse eventKey={id}>
                                    <CollapsedBody>

                                        <CustomTabsView
                                            tabsItems={tabsItems}
                                        />

                                    </CollapsedBody>
                                </Accordion.Collapse>
                            </Col>

                        </Row>
                    </Col>
                    <WrapToggleBlock md={2}>
                        <CustomToggle eventKey={id}/>
                    </WrapToggleBlock>
                </Row>
            </Container>

        </BlockBody>
    );
}

export default CardBody;

