import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  setVoteProposalObj,
  setStepVoteCounter,
  setDisabledCreatedProposalBtn,
  executeProposal, updateProposal
} from 'store/actions/action-creaters/voting/proposals';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import CardHeader from 'pages/UserPages/Proposals/components/ProposalsList/CardHeader';
import CardBody from 'pages/UserPages/Proposals/components/ProposalsList/CardBody';
import ModalVote from 'pages/UserPages/Proposals/components/CreateQProposalBtn/ModalVote';

import { Accordion } from 'react-bootstrap';
import { CardBlock, LoadingW } from './styles';

function ProposalsList(props) {
  const {
    proposals,
    proposalsKind,
    loading,
    errorMessage,
    activeTab
  } = props;
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [proposalId, setProposalId] = useState(null);
  const [vetoEndTime, setVetoEndTime] = useState(null);
  const [proposalContract, setProposalContract] = useState(null);

  const onProposalVote = (id, contract, vetoEndTime) => {
    dispatch(setDisabledCreatedProposalBtn(true));
    setProposalId(id);
    setVetoEndTime(vetoEndTime);
    setProposalContract(contract);
    setModalShow(true);
  };

  const onProposalExecute = (id, contract) => {
    dispatch(executeProposal({
      idProposal: id,
      contract
    }));
  };
  const onProposalUpdate = (id, contract) => {
    dispatch(updateProposal({
      idProposal: id,
      contract
    }));
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        {loading ? <LoadingW xs={12}><LoadingSpinner/></LoadingW> :
          errorMessage ? <p>No proposals</p> :
            proposals?.length === 0
              ? <p>No proposals</p>
              : !proposals ? <p>No proposals</p> : proposals.map((proposal, i) => {
                //TODO: don`t show proposal if veto time === 0
                // return remainDate(proposal.vetoEndTime) !== 0 ?
                return <CardBlock key={proposal.id + proposal?.contract}>
                  <CardHeader
                    title={proposal.title}
                    status={proposal.status}
                    handleVote={() => {
                      onProposalVote(proposal.id, proposal.contract, proposal.vetoEndTime);
                    }}
                    handleExecute={() => {
                      onProposalExecute(proposal.id, proposal.contract);
                    }}
                    handleUpdate={() => {
                      onProposalUpdate(proposal.id, proposal.contract);
                    }}
                  />
                  <CardBody
                    id={proposal.id + proposal?.contract}
                    proposalType={proposal?.type}
                    vetoTime={proposal.vetoEndTime}
                    votingTime={proposal.votingEndTime}
                    proposalID={proposal.id}
                    proposal={proposal}
                    proposalsKind={proposalsKind}
                    voteBreakdown={proposal}
                    contract={proposal.contract}
                  />
                </CardBlock>;
              })
        }
      </Accordion>
      <ModalVote
        proposalContract={proposalContract}
        proposalId={proposalId}
        vetoEndTime={vetoEndTime}
        activeTab={activeTab}
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(setVoteProposalObj({}));
          dispatch(setStepVoteCounter(1));
          dispatch(setDisabledCreatedProposalBtn(true));

        }}
      />
    </>
  );
}

export default ProposalsList;

