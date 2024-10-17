import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'react-i18next';

import { Form, useForm } from '@q-dev/form-hooks';
import { Tip } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';
import styled, { useTheme } from 'styled-components';

import Input from 'components/Input';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { getDelegatorShare } from 'contracts/helpers/validators-helper';

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
    isValid: addresses.map(item => item.toLowerCase()).indexOf(address.toLowerCase()) === -1,
    message: 'Duplicate address'
  };
};

const validator = (validators: string[]) => (val: string) => {
  return {
    isValid: validators.some((address) => address.toLowerCase() === val.toLowerCase()),
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
    const delegatorShare = await getDelegatorShare(address);
    setDelegatorShare(delegatorShare);
  } catch (e) {
    setDelegatorShare(0);
    ErrorHandler.processWithoutFeedback(e);
  }
  setIsLoaded(true);
}

function DelegationForm ({ onChange, validators, delegatedStake, maxAmount, addresses }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { qTicker } = useNetworkConfig();
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
    if (validators.some((address) => address.toLowerCase() === form.values.address.toLowerCase())) {
      loadDelegatorShare(form.values.address.toLowerCase(), setDelegatorShare, setIsLoaded);
    }
  }, [form.values.address]);

  const chosenAddress = validators.find(address => address.toLowerCase() === form.values.address.toLowerCase());

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
                  {`${t('DELEGATED_STAKE')} : ${formatAsset(delegatedStake, qTicker)}`}
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
