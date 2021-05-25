import React from 'react';

import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faShare } from '@fortawesome/free-solid-svg-icons';

import { BlockBody, ToggleBtn } from './styles';

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
  const {
    id,
    collapsedContent,
    children,
  } = props;

  return (
    <BlockBody>
      {children}
      <CustomToggle eventKey={id}/>
      <Accordion.Collapse eventKey={id}>
        {collapsedContent}
      </Accordion.Collapse>
    </BlockBody>
  );
}

export default ListCardBody;

