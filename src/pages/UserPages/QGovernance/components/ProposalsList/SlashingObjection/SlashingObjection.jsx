import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from "constants/statuses"
import {
  setCreatedStepsLimit, setCreateObj,
  setStepCounter
} from 'store/actions/action-creaters/auctions/modalHandler';
import {
  onEscrowRecallProposeDecision, onEscrowConfirmDecision
} from 'store/actions/action-creaters/voting/slashing-proposals';

import { userAddressMetamask } from 'store/selectors/user-inf';

import ListDetails from './ListDetails';
import Button from 'components/Base/Buttons/Button';
import ModalSlashingObjection from './ModalSlashingObjection';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { Container, Row, Col } from 'react-bootstrap';
import { WrapBtn, WrapBtnGroup } from './styles';
import { TitleSmall } from 'components/Custom/PageLists/styles';
import SlashingEscrow from '../../../../../../contracts/src/voting/SlashingEscrow';

function SlashingObjection(props) {
  const { contract, proposalId, objData } = props;
  const [modalShow, setModalShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);


  const objectionData = useMemo(() => {
    return (
      [
        {
          title: 'Status',
          value: objData.objection.statusObjection,
        },
        {
          title: 'Remark',
          value: objData.objection.remark,
        },
        {
          title: 'Executed',
          value: String(objData.objection.executed),
        },
        {
          title: 'Slashed Amount',
          value: objData.objection.slashedAmount + ' Q',
        },
        {
          title: 'Objection End Time',
          value: objData.objection.objectionEndTime,
        },
        {
          title: 'Appeal End Time',
          value: objData.objection.appealEndTime,
        },
      ]
    );
  }, [objData?.objection]);

  const decisionData = useMemo(() => {
    return (
      [
        {
          title: 'Current decision proposer',
          value: objData.decision.proposer,
        },
        {
          title: 'Current decision end time',
          value: objData.decision.endDate,
        },
        {
          title: 'Remark',
          value: objData.decision.externalReference,
        },
        {
          title: 'Adjusted slashing percentage',
          value: objData.decision.percentage + '%',
        },
        {
          title: 'Current confirmation count',
          value: objData.decision.confirmationCount,
        },
        {
          title: 'Required confirmations',
          value: objData.decision.requiredConfirmations,
        },
        {
          title: 'Current Confirmation Percentage',
          value: objData.decision.currentConfirmationPercentage + '%',
        },
      ]
    );
  }, [objData?.decision]);

  const onRecallCurrentDecision = useCallback(() => {
    dispatch(onEscrowRecallProposeDecision(contract, proposalId));
  }, [dispatch]);

  const onConfirmCurrentDecision = useCallback(() => {
    dispatch(onEscrowConfirmDecision(contract, proposalId));
  }, [dispatch]);

  const onShowModal = (activeTab) => {
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

  const executeDecision = async () => {
    setIsPending(true)
    const slashingEscrowContract = new SlashingEscrow(
      contract === 'ValidatorsSlashingVoting'
        ? 'ValidatorsSlashingEscrow' : 'RootNodesSlashingEscrow'
    );
    try {
      await slashingEscrowContract.execute(proposalId, userAddress);
    } catch (e) {
      console.error(e);
    }
    setIsPending(false)

  };

  const executeDecisionBTN = <WrapBtn>
        <Button
          title={isPending ? <LoadingSpinner/> : "Execute Decision"}
          width="100%"
          handleButton={executeDecision}
        />
  </WrapBtn>
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <TitleSmall>Objection</TitleSmall>
          <ListDetails list={objectionData}/>
          <WrapBtn>
            <Button
              title="Cast Objection"
              width="100%"
              handleButton={onCastObjection}
            />
          </WrapBtn>
        </Col>
        <Col md={6}>
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
                handleButton={onConfirmCurrentDecision}
              />
              <Button
                title="Recall current decision"
                width="100%"
                handleButton={onRecallCurrentDecision}
              />
            </WrapBtnGroup>
          </WrapBtn>
          { objData.objection.statusObjection === STATUSES.decided && executeDecisionBTN}
        </Col>
      </Row>
      <ModalSlashingObjection
        contract={contract}
        proposalId={proposalId}
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

