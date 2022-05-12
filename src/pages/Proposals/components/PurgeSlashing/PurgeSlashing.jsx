import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import Tooltip from 'components/Base/Tooltip';

import useInputForm from 'hooks/useInputForm';

import { PurgeSlashingContainer } from './styles';

import { isUserRootNode } from 'store/root-node/selectors';
import { setPurgeSlashing } from 'store/voting/slashing-proposals/action-creators';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { isAddress } from 'func/useful';

const USER_NOT_ROOT_NODE = 'User is not root node';

function PurgeSlashing () {
  const dispatch = useDispatch();
  const isRootNode = useSelector(isUserRootNode);

  const { register, handleSubmit, errors } = useInputForm(formTypes.purgeSlashing, { mode: 'onChange' });

  function handlePurge (formData, contractType) {
    dispatch(setPurgeSlashing(formData.slashingAddress, contractType));
  }

  return (
    <CustomBlock>
      <h1>Purge Slashing</h1>
      <FormInput
        ref={register({
          required: 'Please, fill the field',
          validate: (address) => (isAddress(address) ? true : 'Incorrect address')
        })}
        name="slashingAddress"
        placeholder="Candidate address"
        error={errors.slashingAddress?.message}
      />

      <PurgeSlashingContainer>
        <Tooltip disabled={isRootNode} additionalInfo={USER_NOT_ROOT_NODE}>
          <Button
            disabled={!isRootNode}
            title="Purge Root Node"
            style={{ width: '150px' }}
            onClick={handleSubmit((data) => handlePurge(data, CONTRACT_TYPES.rootNodes))}
          />
        </Tooltip>
        <Tooltip disabled={isRootNode} additionalInfo={USER_NOT_ROOT_NODE}>
          <Button
            disabled={!isRootNode}
            style={{ width: '150px' }}
            title="Purge Validator"
            onClick={handleSubmit((data) => handlePurge(data, CONTRACT_TYPES.validators))}
          />
        </Tooltip>
      </PurgeSlashingContainer>
    </CustomBlock>
  );
}

export default PurgeSlashing;
