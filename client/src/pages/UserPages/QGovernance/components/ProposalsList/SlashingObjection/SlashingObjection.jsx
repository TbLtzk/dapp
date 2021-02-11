import React, { useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TitleSmall } from 'components/Custom/PageLists/styles';
import CustomBlock from 'components/Base/CustomBlock';
import ListDetails from './ListDetails';
import Button from 'components/Base/Buttons/Button';
import ModalSlashingObjection from './ModalSlashingObjection';
import { WrapBtn, WrapBtnGroup } from './styles';
import { useDispatch } from 'react-redux';
import {
  setCreatedStepsLimit, setCreateObj,
  setStepCounter
} from 'store/actions/action-creaters/auctions/modalHandler';

function SlashingObjection(props) {
  const { data } = props;
  const [modalShow, setModalShow] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const dispatch = useDispatch();

  const objectionData = useMemo(() => {
    return (
      [
        {
          title: 'Status',
          value: 'Pending',
        },
        {
          title: 'Remark',
          value: 'http://filedForArbitration.info',
        },
        {
          title: 'Executed',
          value: 'false',
        },
        {
          title: 'Slashed Amount',
          value: '2.4 Q',
        },
        {
          title: 'Objection End Time',
          value: 'March 15, 2021 13:45 GMT',
        },
        {
          title: 'Appeal End Time',
          value: 'December 26, 2021 18:00 GMT',
        },
      ]
    );
  }, []);

  const decisionData = useMemo(() => {
    return (
      [
        {
          title: 'Current decision proposer',
          value: '0x4a14D788D86D021670EBcecE1196631d66595984',
        },
        {
          title: 'Current decision end time',
          value: 'March 24, 2021 15:35 GMT',
        },
        {
          title: 'Remark',
          value: 'http://courtrulingresults.info',
        },
        {
          title: 'Adjusted slashing percentage',
          value: '7%',
        },
        {
          title: 'Current confirmation count',
          value: '3',
        },
        {
          title: 'Required confirmations',
          value: '10',
        },
        {
          title: 'Current Confirmation Percentage',
          value: '30%',
        },
      ]
    );
  }, []);

  const onShowModal = (activeTab) =>{
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    setActiveModal(activeTab);
    setModalShow(true);
    dispatch(setCreateObj({ first: activeTab }));
  };

  const onCastObjection = () => {
    onShowModal('cast-objection');
  };

  const onProposeDecision = () => {
    onShowModal('propose-decision');
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          {/*<CustomBlock style={{ padding: '7px' }}>*/}
          <TitleSmall>Objection</TitleSmall>
          <ListDetails list={objectionData}/>
          <WrapBtn>
            <Button
              title="Cast Objection"
              width="100%"
              handleButton={onCastObjection}
            />
          </WrapBtn>
          {/*</CustomBlock>*/}
        </Col>
        <Col md={6}>
          {/*<CustomBlock style={{ padding: '7px' }}>*/}
          <TitleSmall>Decision</TitleSmall>
          <ListDetails list={decisionData}/>
          <WrapBtn>
            <Button
              title="Propose Decision"
              width="100%"
              handleButton={onProposeDecision}
            />
            <WrapBtnGroup>
              <Button
                title="Vote to confirm current decision"
                width="100%"
                handleButton={() => {
                  console.log('click');
                }}
              />
              <Button
                title="Recall current decision"
                width="100%"
                handleButton={() => {
                  console.log('click');
                }}
              />
            </WrapBtnGroup>
          </WrapBtn>
          {/*</CustomBlock>*/}
        </Col>
      </Row>
      <ModalSlashingObjection
        activeTab={activeModal}
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(setCreateObj({}));
        }}
      />
    </Container>
  );
}

export default SlashingObjection;

