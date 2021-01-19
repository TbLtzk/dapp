import React, { useMemo, useState } from 'react';

import { Accordion, Col, Container, Row, useAccordionToggle, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faShare } from '@fortawesome/free-solid-svg-icons';

import { BlockBody, CollapsedBody, Details, WrapToggleBlock, ToggleBtn, BtnShare } from './styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function CustomToggle({ eventKey }) {
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
  const { id, bodyMainContent, collapsedContent, children, onShareBtn, shareText } = props;

  return (
    <BlockBody>
      <Container fluid>
        <Row>
          <Col md={10}>
            <Row>
              {children}
            </Row>
          </Col>
          <WrapToggleBlock md={2}>

            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={'tooltip-top' + id}>
                  <span>Copy to clipboard</span>
                </Tooltip>
              }
            >
              <CopyToClipboard text={shareText}>
                <BtnShare
                  type="button"
                  onClick={() => {
                    // console.log('Copied to clipboard');
                  }}
                >
                  <span>Share</span>
                  <FontAwesomeIcon icon={faShare}/>
                </BtnShare>
              </CopyToClipboard>
            </OverlayTrigger>

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

