import React, {useMemo} from "react";
import {Accordion, Card, useAccordionToggle, Row, Col, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown, faCalendarAlt, faClock} from "@fortawesome/free-solid-svg-icons";

import CustomTabsView from "components/Base/Tabs/CustomTabsView";
import Button from "components/Base/Button";
import PollDetail from "./PollDetail";
import VoteBreakdown from "./VoteBreakdown";

import {
    ToggleBtn, CardBlock, CardHeader, CardTitle, WrapBtnHeader, CardBody, MainText, WrapToggleBlock,
    Details, CollapsedBody
} from "./styles";



function CustomToggle({eventKey}) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        console.log('totally custom!'),
    );

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

function Proposal() {

    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "poll-detail",
                    title: "Poll Detail",
                    content: (
                        <PollDetail/>
                    )
                },
                {
                    label: "vote-breakdown",
                    title: "Vote Breakdown",
                    content: (
                        <VoteBreakdown/>
                    )
                },
            ]
        )
    }, []);

    return (
        <Accordion defaultActiveKey="0">
            <CardBlock>
                <CardHeader>
                    <Row>
                        <CardTitle md={10}>
                            <p>Community Greenlight Poll - cUSDC (Compound USDC cToken)</p>
                        </CardTitle>
                        <WrapBtnHeader md={2}>
                            <Button
                                title="Vote"
                                type="white"
                                handleButton={() => {
                                    console.log("Vote")
                                }}
                            />

                        </WrapBtnHeader>
                    </Row>

                </CardHeader>
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col md={10}>
                                <MainText>Text</MainText>
                                <Row>
                                    <Details md={4}>
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                        <span>October 19, 2020</span>
                                    </Details>
                                    <Details md={4}>
                                        <FontAwesomeIcon icon={faClock}/>
                                        <span>7d 0h remaining</span>
                                    </Details>
                                    <Details md={4}>
                                        <span>Proposal ID: 434</span>
                                    </Details>
                                    <Col md={10}>
                                        <Accordion.Collapse eventKey="0">
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
                                <CustomToggle eventKey="0"/>
                            </WrapToggleBlock>
                        </Row>
                    </Container>

                </CardBody>
            </CardBlock>

            <CardBlock>
                <CardHeader>
                    <Row>
                        <CardTitle md={10}>
                            <p>Community Greenlight Poll - cUSDC (Compound USDC cToken)</p>
                        </CardTitle>
                        <WrapBtnHeader md={2}>
                            <Button
                                title="Vote"
                                type="white"
                                handleButton={() => {
                                    console.log("Vote")
                                }}
                            />

                        </WrapBtnHeader>
                    </Row>

                </CardHeader>
                <CardBody>
                    <Container fluid>
                        <Row>
                            <Col md={10}>
                                <MainText>Text</MainText>
                                <Row>
                                    <Details md={4}>
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                        <span>October 19, 2020</span>
                                    </Details>
                                    <Details md={4}>
                                        <FontAwesomeIcon icon={faClock}/>
                                        <span>7d 0h remaining</span>
                                    </Details>
                                    <Details md={4}>
                                        <span>Proposal ID: 434</span>
                                    </Details>
                                    <Col md={10}>
                                        <Accordion.Collapse eventKey="1">
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
                                <CustomToggle eventKey="1"/>
                            </WrapToggleBlock>
                        </Row>
                    </Container>

                </CardBody>
            </CardBlock>
        </Accordion>
    );
}

export default Proposal;

