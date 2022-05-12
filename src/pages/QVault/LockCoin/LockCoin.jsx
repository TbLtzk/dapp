import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import LockForm from './components/LockForm';

import { setUnlockAmount } from 'store/q-vault/action-creators';
import { votingWeight } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';

function LockCoin () {
  const dispatch = useDispatch();

  const userVotingWeight = Number(useSelector(votingWeight));
  const address = useSelector(userAddressMetamask);

  const {
    register: registerUnlock,
    handleSubmit: submitUnlock,
    errors: errorUnlock,
    setValue: setUnlockMax,
  } = useInputForm(formTypes.qVaultUnlock);

  function handleUnlockMax () {
    if (userVotingWeight > 0) {
      setUnlockMax('amountQ', userVotingWeight);
    }
  }

  function handleUnlock (formData) {
    dispatch(setUnlockAmount(address, formData.amountQ));
  }

  return (
    <CustomBlock>
      <h1>Lock Your Q Tokens for Voting</h1>
      <h5 style={{ marginBottom: '15px' }}>
        Participate in Q Governance with your Locked Amount
      </h5>
      <LockForm />

      <h4>Reduce Voting Weight by</h4>
      <div className={'card__one-line-simple-form'}>
        <FormInput
          ref={registerUnlock({ required: 'Please, fill the field' })}
          min={0}
          name="amountQ"
          type="number"
          prefix="Q"
          placeholder="0.0"
          error={errorUnlock.amountQ?.message}
          onMaxClick={handleUnlockMax}
        />
        <Button
          type="outline"
          title="Reduce"
          width="90px"
          handleButton={submitUnlock(handleUnlock)}
        />
      </div>
      <div className="card__actions">
        <ButtonLinkArrow
          alwaysEnabled
          title="Go to Governance"
          path="/q-governance"
        />
      </div>
    </CustomBlock>
  );
}

export default LockCoin;
