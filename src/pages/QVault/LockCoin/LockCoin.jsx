import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setLockAmount, setUnlockAmount } from 'store/q-vault/action-creators';
import { votingWeight } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import 'react-datepicker/dist/react-datepicker.css';

function LockCoin ({ maxQVaultVotingWeight }) {
  const dispatch = useDispatch();

  const userVotingWeight = Number(useSelector(votingWeight));
  const address = useSelector(userAddressMetamask);

  const {
    register: registerLock,
    handleSubmit: submitLock,
    errors: errorLock,
    setValue: setLockMax,
    setCurrentType: setLockType
  } = useInputForm('lock');

  const {
    register: registerUnlock,
    handleSubmit: submitUnlock,
    errors: errorUnlock,
    setValue: setUnlockMax,
    setCurrentType: setUnlockType
  } = useInputForm('unlock');

  function handleUnlockMax () {
    if (userVotingWeight > 0) {
      setUnlockMax('amountQ', userVotingWeight);
    }
  }

  function handleLockMax () {
    if (maxQVaultVotingWeight > 0) {
      setLockMax('amountQ', maxQVaultVotingWeight);
    }
  }

  function handleLock (formData) {
    setLockType('lock');
    dispatch(setLockAmount(address, formData.amountQ));
  }
  function handleUnlock (formData) {
    setUnlockType('unlock');
    dispatch(setUnlockAmount(address, formData.amountQ));
  }

  return (
    <CustomBlock>
      <h1>Lock Your Q Tokens for Voting</h1>
      <h5 style={{ marginBottom: '15px' }}>Participate in Q Governance with your Locked Amount</h5>
      <h4>Increase Voting Weight by</h4>
      <div className={'card__one-line-simple-form'}>
        <FormInput
          ref={registerLock({ required: 'Field is required!' })}
          color={true}
          min={0}
          lbl={'Q'}
          name="amountQ"
          type="number"
          placeholder="0.0"
          valid={errorLock.amountQ?.message}
          onMaxClick={handleLockMax}
        />
        <Button
          type="outline"
          title="Increase"
          width="90px"
          handleButton={submitLock(handleLock)}
        />
      </div>

      <h4>Reduce Voting Weight by</h4>
      <div className={'card__one-line-simple-form'}>
        <FormInput
          ref={registerUnlock({ required: 'Field is required!' })}
          color={true}
          min={0}
          name="amountQ"
          type="number"
          lbl={'Q'}
          placeholder="0.0"
          valid={errorUnlock.amountQ?.message}
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
