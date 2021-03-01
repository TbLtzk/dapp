import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fN } from 'func/useful';
import { ContainerBCI } from './styles';

export default function BlockCardItem(props) {
  const { txt1, val1, txt2, val2, txt3, val3, setActCardData, vault } = props;

  const clickItem = (e) => {
    //TODO: rewrite
    const elementAct = document.querySelector('div.active.borrowing');
    // const elementAct = document.querySelector('div.active');
    const elementToAct = e.target.closest('div.row');

    // Clear all dynamic classes
    if (elementAct !== null) elementAct.classList.remove('active');
    if (elementAct !== null) elementAct.classList.remove('borrowing');
    // if (elementAct !== null) elementAct.classList.remove('active');
    const cont1 = document.querySelector('div.first');
    if (cont1 !== null) cont1.classList.remove('first');
    const cont2 = document.querySelector('div.last');
    if (cont2 !== null) cont2.classList.remove('last');

    const colContainer = document.querySelector('div.col-container');
    const colInfoContainerSaving = document.querySelector('div.col-info-container.saving');
    const colInfoContainerBorrow = document.querySelector('div.col-info-container.borrow');
    if (elementAct === elementToAct) {
      // Set col to 12
      colContainer.classList.remove('col-8');
      colContainer.classList.add('col-12');
      colInfoContainerSaving.classList.remove('active');
      colInfoContainerSaving.classList.remove('borrowing');
      colInfoContainerBorrow.classList.remove('active');
      colInfoContainerBorrow.classList.remove('borrowing');
    } else {
      // Setup new classes
      const container = e.target.closest('div.card-item-container');
      elementToAct.classList.add('active');
      elementToAct.classList.add('borrowing');

      container.childNodes.forEach((el, index) => {
        if (elementToAct === el && index === 1) {
          container.classList.add('first');
        }
        if (elementToAct === el && (container.childNodes.length - 1) === index) {
          container.classList.add('last');
        }
      });

      colContainer.classList.remove('col-12');
      colContainer.classList.add('col-8');
      if (container.classList.contains('borrow')) {
        colInfoContainerBorrow.classList.add('active');
        colInfoContainerBorrow.classList.add('borrowing');
        colInfoContainerSaving.classList.remove('active');
        colInfoContainerSaving.classList.remove('borrowing');
        setActCardData({
          type: 'borrow',
          collateral: val1,
          borrow: val2,
          vault
        });
      } else {
        colInfoContainerBorrow.classList.remove('active');
        colInfoContainerBorrow.classList.remove('borrowing');
        colInfoContainerSaving.classList.add('active');
        colInfoContainerSaving.classList.add('borrowing');
        setActCardData({
          type: 'saving',
          deposit: val1,
          interest: val2,
          intRate: val3
        });
      }
    }
  };

  return (
    <ContainerBCI onClick={(e) => clickItem(e)}>
      <Col xs={4} className="info-cont">
        <span>{txt1}</span>
        <span>{val1}</span>
      </Col>
      <Col xs={4} className="info-cont">
        <span>{txt2}</span>
        <span>{val2}</span>
      </Col>
      <Col xs={4} className="info-cont">
        <span>{txt3}</span>
        <span>{val3 === undefined ? '-' : `${fN(val3)}%`}</span>
      </Col>
    </ContainerBCI>
  );
}

BlockCardItem.propTypes = {
  txt1: PropTypes.string.isRequired,
  val1: PropTypes.string.isRequired,
  txt2: PropTypes.string.isRequired,
  val2: PropTypes.string.isRequired,
  txt3: PropTypes.string.isRequired,
  val3: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setActCardData: PropTypes.func.isRequired,
  vault: PropTypes.object,
};

BlockCardItem.defaultProps = {
  vault: {},
  val3: '',
};
