import React from 'react';
import { Accordion, DropdownButton, useAccordionToggle } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import CustomHeaderButtons from 'components/Custom/CustomCardButtons';

import { ListCardBody, ListCardHeader, ListCardWrp } from './styles';

import { theme } from 'store/theme/selectors';

export function CustomToggle ({ eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {});

  return (
    <a className="dropdown-item" onClick={decoratedOnClick}>
      <i className={'mdi mdi-eye-outline btn-icon'} />
      View details
    </a>
  );
}

function ListCard ({
  headerLeftSide,
  headerRightSide,
  id,
  content,
  shareText,
  collapsedContent,
  dropdownButtonTitle,
  dropdownItems,
  customHeaderButtons
}) {
  const currentTheme = useSelector(theme);

  return (
    <ListCardWrp palette={currentTheme}>
      <Accordion defaultActiveKey="0">
        <ListCardHeader>
          <div>{headerLeftSide}</div>
          <div>
            {!customHeaderButtons
              ? (
                headerRightSide || (
                  <DropdownButton
                    menuAlign="right"
                    title={dropdownButtonTitle || 'Actions'}
                    id="dropdown-menu-align-right"
                  >
                    {dropdownItems}
                    <CustomToggle eventKey={id} />
                  </DropdownButton>
                )
              )
              : (
                <CustomHeaderButtons eventKey={id} shareText={shareText} />
              )}
          </div>
        </ListCardHeader>
        <ListCardBody>
          {content}
          <Accordion.Collapse eventKey={id}>{collapsedContent}</Accordion.Collapse>
        </ListCardBody>
      </Accordion>
    </ListCardWrp>
  );
}

export default ListCard;
