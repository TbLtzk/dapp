import React, { useMemo, useState } from 'react';

import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import {
  setCreatedStepsLimit,
  setCreateProposalObj,
  setStepCounter
} from 'store/actions/action-creaters/voting/proposals';
import { getParameterValueByKeySuccess } from 'store/actions/action-creaters/parameters';

import ModalCreateProposal from './ModalCreateProposal';
import CreateQBtn from 'components/Custom/PageLists/CreateQBtn';

import { QExpert, QProposal, QRootNode, QSlashing } from './constants';

const { useDrizzle } = drizzleReactHooks;

function CreateQProposalBtn(props) {
  const { activeTab } = props;
  const { drizzle } = useDrizzle();
  const userAddress = useSelector(userAddressMetamask);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const activeTabTitle = useMemo(() => {
    // return activeTab.replace(/-/g, " ")
    switch (activeTab) {
      case 'q-proposals':
        return QProposal;
      case 'q-root-node-panel':
        return QRootNode;
      case 'q-expert-proposals':
        return QExpert;
      case 'slashing-proposals':
        return QSlashing;
      default:
        return QProposal;
    }
  }, [activeTab]);

  const onCreateProposal = async () => {
    dispatch(setStepCounter(1));
    setModalShow(true);
    switch (activeTab) {
      case 'q-proposals':
        dispatch(setCreatedStepsLimit(4));
        break;
      case 'q-root-node-panel':
        dispatch(setCreatedStepsLimit(3));
        break;
      case 'q-expert-proposals':
        dispatch(setCreatedStepsLimit(3));
        break;
      case 'slashing-proposals':
        dispatch(setCreatedStepsLimit(3));
        break;
      default:
        return QProposal;
    }
  };

  return (
    <>
      <CreateQBtn
        onCreate={onCreateProposal}
        activeTabTitle={activeTabTitle}
      />

      <ModalCreateProposal
        activeTab={activeTab}
        activeTabTitle={activeTabTitle}
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(setCreateProposalObj({}));
          dispatch(getParameterValueByKeySuccess(''));
        }}
      />
    </>

  );
}

export default CreateQProposalBtn;

