import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { userBalance } from 'store/selectors/q-piggy-bank';

import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { ComponentHandler, ContractHandler } from './handler';
import PiggyBankHandler from '../../handler';

import { useAlert } from 'react-alert';
import { UpdateDelegationContainer } from './styles';

export default function UpdateDelegation() {
  const { register: reg1 } = useForm();

  const [userBalancePB, setUserBalance] = useState(0);

  const address = useSelector(userAddressMetamask);
  const userPBBalanceL = useSelector(userBalance);

  const contHandler = new ContractHandler(address, useDispatch(), useAlert());
  const compHandler = new ComponentHandler(useAlert());
  const pBHandler = new PiggyBankHandler(address, useDispatch(), useAlert());

  function addInputContainer(isFirstCall = false) {
    const inputContainers = document.querySelectorAll('.input_container .input_container_item');
    if (inputContainers.length > 0 && isFirstCall === true) return;

    const container = document.querySelector('.input_container');
    const temp = document.querySelector('.input_container_template');
    const newNode = temp.cloneNode(true);
    newNode.style.display = 'block';
    container.appendChild(newNode);
  }

  useEffect(() => {
    addInputContainer(true);
    // pBHandler.setUserBalance(setUserBalance);
  }, []);

  function updateDelegations(applyZeroShare) {
    const data = compHandler.getAddressesAndShares(applyZeroShare, userPBBalanceL);
    if (data.addresses.length !== 0 && data.shares.length !== 0) {
      contHandler.delegateStake(data.addresses, data.shares);
    }
  }

  return (
    <UpdateDelegationContainer>
      <span className="title">Update delegation</span>
      <div className="input_container_template" style={{ display: 'none' }}>
        <div className="input_container_item">
          <div className="input_address">
            <FormInput
              name="address"
              type="text"
              placeholder="0x000..."
              ref={reg1({ required: 'Field is required!', pattern: /[0-9]/i })}
            />
          </div>
          <div className="input_share">
            <FormInput
              name="share"
              type="number"
              placeholder="Weight"
              ref={reg1({ required: 'Field is required!', min: 100 })}
            />
          </div>
        </div>
      </div>
      <div className="label_container">
        <div className="input_container_item">
          <div className="input_address">
            <span>Address</span>
          </div>
          <div className="input_share">
            <span>Share</span>
          </div>
        </div>
      </div>
      <div className="input_container" />
      <div className="btn_additional">
        <Button
          type="outline"
          title="+"
          width="35px"
          handleButton={() => addInputContainer()}
        />
      </div>

      <div className="btn_container">
        <Button
          type="outline"
          title="Update Delegation"
          width="auto"
          handleButton={() => updateDelegations(false)}
        />
        <Button
          type="outline"
          title="Remove Delegation"
          width="30%"
          handleButton={() => updateDelegations(true)}
        />
      </div>
    </UpdateDelegationContainer>
  );
}
