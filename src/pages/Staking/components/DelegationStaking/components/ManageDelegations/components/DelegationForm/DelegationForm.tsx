import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';

import styled, { useTheme } from 'styled-components';

import Input from 'ui/Input';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';
import { Form } from 'hooks/useFormArray';

import { getValidatorDelegatorShare } from 'contracts/helpers/validators-helper';

import { captureError } from 'utils/errors';
import { formatAsset } from 'utils/numbers';
import { address, max, required } from 'utils/validators';

interface Props {
  onChange: (form: Form<{ address: string; amount: string }>) => void;
  validators: string[];
  delegatedStake: string;
  maxAmount: string;
  addresses: string[];
}

const DelegationFormContainer = styled.form`
  .delegation-form__inputs {
    display: grid;
    grid-gap: 15px;
  }
`;

const duplicateAddress = (addresses: string[]) => (address: string) => {
  return {
    isValid: addresses.indexOf(address) === -1,
    message: 'Duplicate address'
  };
};

const validator = (validators: string[]) => (val: string) => {
  return {
    isValid: validators.some((address) => address === val),
    message: 'Not a validator'
  };
};

async function loadDelegatorShare (
  address: string,
  setDelegatorShare: Dispatch<SetStateAction<number>>,
  setIsLoaded: Dispatch<SetStateAction<boolean>>
) {
  setIsLoaded(false);
  try {
    const delegatorShare = await getValidatorDelegatorShare(address);
    setDelegatorShare(delegatorShare);
  } catch (e) {
    setDelegatorShare(0);
    captureError(e);
  }
  setIsLoaded(true);
}

function DelegationForm ({ onChange, validators, delegatedStake, maxAmount, addresses }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [delegatorShare, setDelegatorShare] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address, duplicateAddress(addresses), validator(validators)],
      amount: [required, max(maxAmount)],
    },
  });

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  useEffect(() => {
    if (validators.some((address) => address === form.values.address)) {
      loadDelegatorShare(form.values.address, setDelegatorShare, setIsLoaded);
    }
  }, [form.values.address]);

  const chosenAddress = validators.find(address => address === form.values.address);

  return (
    <DelegationFormContainer
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="delegation-form__inputs">
        <Input
          {...form.fields.address}
          label={t('VALIDATOR_ADDRESS')}
          placeholder={t('ADDRESS')}
        />
        {chosenAddress !== undefined && (
          <Tip compact>
            {isLoaded
              ? <>
                <p className="text-md">{`${t('DELEGATOR_SHARE')} : ${formatAsset(delegatorShare, '%')}`}</p>
                <p className="text-md">
                  {`${t('DELEGATED_STAKE')} : ${formatAsset(delegatedStake, 'Q')}`}
                </p>
              </>
              : <ContentLoader
                speed={2}
                width="100%"
                height={40}
                backgroundColor={colors.tertiaryMiddle}
                foregroundColor={colors.tertiaryLight}
              >
                <rect
                  x="0"
                  y="0"
                  rx="3"
                  ry="3"
                  width="250"
                  height="18"
                />
                <rect
                  x="0"
                  y="22"
                  rx="3"
                  ry="3"
                  width="250"
                  height="18"
                />
              </ContentLoader>
            }
          </Tip>
        )}
        <Input
          label={t('AMOUNT_NEW_STAKE')}
          {...form.fields.amount}
          type="number"
          placeholder="0.00"
          max={maxAmount}
        />
      </div>
    </DelegationFormContainer>
  );
}

export default DelegationForm;
