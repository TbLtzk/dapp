import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { userBalance } from 'store/selectors/q-piggy-bank';

import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { ComponentHandler, ContractHandler } from './handler';

import { useAlert } from 'react-alert';
import { UpdateDelegationContainer } from './styles';
import { TabStyle } from '../../../../../components/Base/Tabs/BigTabsView/styles';

export default function UpdateDelegation() {
  const { register: reg1 } = useForm();

  const address = useSelector(userAddressMetamask);
  const userPBBalanceL = useSelector(userBalance);

  const contHandler = new ContractHandler(address, useDispatch(), useAlert());
  const compHandler = new ComponentHandler(useAlert());

  const [items, setItems] = useState(1);

  function addInputContainer() {
    if (items < 30) setItems(items + 1);
  }

  function removeInputContainer() {
    if (items > 1) setItems(items - 1);
  }

  function updateDelegations(applyZeroShare) {
    const data = compHandler.getAddressesAndShares(applyZeroShare, userPBBalanceL);
    if (data.addresses.length !== 0 && data.shares.length !== 0) {
      contHandler.delegateStake(data.addresses, data.shares);
    }
  }

  function getForms() {
    let elements = [];
    for (let i = 0; i < items; i++) {
      elements.push(
        <div key={i + 'input_address'} className="input_container_item">
          <div className="input_address">
            <FormInput
              name="address"
              type="text"
              placeholder="0x000"
              ref={reg1({
                required: 'Field is required!',
                pattern: /[0-9]/i
              })}
            />
          </div>
          <div className="input_share">
            <FormInput
              name="share"
              type="number"
              lbl="Q"
              placeholder="0.00"
              ref={reg1({
                required: 'Field is required!',
                min: 100
              })}
            />
          </div>
          <div className="btn_additional">
            <Button
              type="outline"
              icon="plus"
              width="34px"
              handleButton={() => addInputContainer()}
            />
            <Button
              type="outline"
              icon="minus"
              width="34px"
              handleButton={() => removeInputContainer()}
            />
          </div>
        </div>
      );
    }
    return elements;
  }

  return (
    <UpdateDelegationContainer>
      <h3>Update delegation</h3>
      <div className="input_container_item">
        <p className="input_address">Address</p>
        <p className="input_share">Share</p>
      </div>
      <div className="input_container">
        {getForms()}
      </div>

      <div className="actions" style={{ marginBottom: '30px' }}>
        <Button
          icon="cached"
          type="outline"
          title="Update Delegation"
          handleButton={() => updateDelegations(false)}
        />
        <Button
          type="outline"
          icon="minus-circle-outline"
          title="Remove Delegation"
          handleButton={() => updateDelegations(true)}
        />
      </div>
    </UpdateDelegationContainer>
  );
}
