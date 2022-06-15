import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import Input from 'components/Base/Form/Input';
import Tooltip from 'components/Base/Tooltip';
import InfoTooltip from 'components/Custom/InfoTooltip';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { PurgeSlashingContainer } from './styles';

import { isUserRootNode } from 'store/root-node/selectors';
import { setPurgeSlashing } from 'store/voting/slashing-proposals/action-creators';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { address, required } from 'func/validators';

const USER_NOT_ROOT_NODE = 'User is not root node';

function PurgeSlashing () {
  const dispatch = useDispatch();
  const isRootNode = useSelector(isUserRootNode);

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
  });

  useMetamaskReset(formTypes.purgeSlashing, form.reset);

  function handlePurge (contractType) {
    if (!form.validate()) return;

    dispatch(setPurgeSlashing(form.values.address, contractType));
  }

  return (
    <CustomBlock>
      <h1>
        <span>Purge Slashing</span>
        <InfoTooltip topic="purge-slashing" />
      </h1>

      <Input
        {...form.fields.address}
        placeholder="Candidate address"
      />

      <PurgeSlashingContainer>
        <Tooltip disabled={isRootNode} additionalInfo={USER_NOT_ROOT_NODE}>
          <Button
            disabled={!isRootNode}
            onClick={() => handlePurge(CONTRACT_TYPES.rootNodes)}
          >
            Purge Root Node
          </Button>
        </Tooltip>

        <Tooltip disabled={isRootNode} additionalInfo={USER_NOT_ROOT_NODE}>
          <Button
            disabled={!isRootNode}
            onClick={() => handlePurge(CONTRACT_TYPES.validators)}
          >
            Purge Validator
          </Button>
        </Tooltip>
      </PurgeSlashingContainer>
    </CustomBlock>
  );
}

export default PurgeSlashing;
