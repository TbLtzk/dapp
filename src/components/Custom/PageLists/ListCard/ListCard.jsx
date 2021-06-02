import React from 'react';
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';

export function CustomToggle({ eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
  });

  return (
    <a className="dropdown-item" onClick={decoratedOnClick}>
      <i className={`mdi mdi-eye-outline btn-icon`}/>View Details
    </a>
  );
}

function ListCard(props) {
  const {
    headerLeftSide,
    headerRightSide,
    id,
    content,
    collapsedContent,

    dropdownButtonTitle,
    dropdownItems

  } = props;
  return (
    <ListCardWrp>
      <Accordion defaultActiveKey="0">
        <ListCardHeader>
          <div>{headerLeftSide}</div>
          <div>
            {headerRightSide
              ? headerRightSide
              : <DropdownButton
                menuAlign="right"
                title={dropdownButtonTitle || 'Actions'}
                id="dropdown-menu-align-right"
              >
                {dropdownItems}
                <CustomToggle eventKey={id}/>
              </DropdownButton>
            }
          </div>
        </ListCardHeader>
        <ListCardBody>
          {content}
          <Accordion.Collapse eventKey={id}>
            {collapsedContent}
          </Accordion.Collapse>
        </ListCardBody>
      </Accordion>
    </ListCardWrp>
  );
}

export default ListCard;
