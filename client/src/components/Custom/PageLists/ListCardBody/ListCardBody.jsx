import React, { useMemo } from 'react';

import { Accordion, Col, Container, Row, useAccordionToggle } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faClock } from '@fortawesome/free-solid-svg-icons';

import { BlockBody, CollapsedBody, Details, MainText, WrapToggleBlock, ToggleBtn } from './styles';

function CustomToggle({ eventKey }) {
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

function ListCardBody(props) {
  const { id, bodyMainContent, collapsedContent } = props;

  return (
    <BlockBody>
      <Container fluid>
        {/*<MainText>{mainText}</MainText>*/}
        <Row>
          <Col md={10}>
            <Row>
              {bodyMainContent}
            </Row>
          </Col>
          <WrapToggleBlock md={2}>
            <CustomToggle eventKey={id}/>
          </WrapToggleBlock>
          <Col md={12}>
            <Accordion.Collapse eventKey={id}>
              <CollapsedBody>
                {collapsedContent}
              </CollapsedBody>
            </Accordion.Collapse>
          </Col>
        </Row>
      </Container>
    </BlockBody>
  );
}

export default ListCardBody;

