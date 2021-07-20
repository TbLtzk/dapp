import React from 'react';
import { useSelector } from 'react-redux';
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { theme } from 'store/selectors/theme';

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
  const currentTheme = useSelector(theme)
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
    <ListCardWrp palette={currentTheme}>
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
