import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FormDelegation } from 'typings/forms';
import { toWei } from 'web3-utils';

import FormBlock from 'components/FormBlock';
import { StakingContainer } from 'pages/Staking/styles';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useFormArray, { Form } from 'hooks/useFormArray';

import ClaimTip from '../../../ClaimTip';
import DelegationForm from '../DelegationForm';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useValidators } from 'store/validators/hooks';

import { formatAsset, toBigNumber } from 'utils/numbers';

function ManageDelegations () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const {
    delegateStake,
    delegationStakeInfo,
    delegationList,
    loadDelegationList,
    loadDelegationStakeInfo
  } = useQVault();
  const { validatorAddressesLongList, loadValidatorAddressesLongList } = useValidators();

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms: FormDelegation[]) => {
      submitTransaction({
        successMessage: t('UPDATE_DELEGATION_SUCCESS'),
        onSuccess: () => formArray.reset(),
        submitFn: () => delegateStake({
          addresses: forms.map((f) => f.address),
          stakes: forms.map((f) => toWei(f.amount)),
        })
      });
    },
  });

  useEffect(() => {
    loadDelegationList();
    loadDelegationStakeInfo();
    loadValidatorAddressesLongList();
  }, []);

  const [
    availableAmountToDelegate,
    newDelegatedStake,
  ] = useMemo(() => {
    const delegationDelta = formArray.forms.reduce((acc, form) => {
      const delegatedStake = getDelegatedStake(form?.values?.address);
      const amount = form?.values?.amount || 0;
      const amountBn = toBigNumber(amount).minus(toBigNumber(delegatedStake));
      return amountBn.plus(acc);
    }, toBigNumber('0'));
    const accessibleAmount = toBigNumber(delegationStakeInfo?.delegatableAmount || '0')
      .minus(delegationDelta);
    const potentialDelegatedStake = toBigNumber(delegationStakeInfo?.totalDelegatedStake || '0')
      .plus(delegationDelta);

    return [
      accessibleAmount.toString(),
      potentialDelegatedStake.toString()
    ];
  }, [formArray.forms, delegationStakeInfo, delegationList]);

  function getDelegatedStake (address: string) {
    const delegate = delegationList.find(i => i.validator === address);
    return delegate?.actualStake ?? '0';
  }

  function getMaxAmountFromForm (form: Form<{ address: string; amount: string }>) {
    return toBigNumber(availableAmountToDelegate)
      .plus(form.values?.amount || '0')
      .toString();
  }

  return (
    <StakingContainer>
      <div className="block" style={{ display: 'grid', gap: '15px', margin: '30px 0 40px 0' }}>
        <div className="delegation-info_container">
          <div className="delegation-item">
            <p className="color-secondary text-md">{t('CURRENT_DELEGATED_STAKE')}</p>
            <p className="text-xl font-semibold ellipsis">{formatAsset(delegationStakeInfo?.totalDelegatedStake, 'Q')}</p>
          </div>
          <div className="delegation-item">
            <p className="color-secondary text-md">{t('AVAILABLE_TO_DELEGATE')}</p>
            <p className="text-xl font-semibold ellipsis">
              {
                toBigNumber(availableAmountToDelegate).isNegative()
                  ? '0 Q'
                  : formatAsset(availableAmountToDelegate, 'Q')
              }
            </p>
          </div>
          <div className="delegation-item">
            <p className="color-secondary text-md">{t('NEW_DELEGATED_STAKE')}</p>
            <p className="text-xl font-semibold ellipsis">{formatAsset(newDelegatedStake, 'Q')}</p>
          </div>
        </div>

        {formArray.forms.map((form, i) => (
          <FormBlock
            key={form.id}
            title={`${t('DELEGATION')} ${i + 1}`}
            icon={formArray.forms.length > 1 ? 'delete' : undefined}
            onAction={() => formArray.removeForm(form.id)}
          >
            <DelegationForm
              validators={validatorAddressesLongList}
              delegatedStake={getDelegatedStake(form?.values?.address)}
              maxAmount={getMaxAmountFromForm(form)}
              addresses={
                formArray.forms
                  .filter((_, j) => j !== i)
                  .map(f => f.values?.address || '')
              }
              onChange={form.onChange}
            />
          </FormBlock>
        ))}
        <ClaimTip/>

        <div className="delegation-buttons">
          <Button look="ghost" onClick={formArray.appendForm}>
            <Icon name="add" />
            <span>{t('ADD_DELEGATION')}</span>
          </Button>

          <Button onClick={() => formArray.submit()}>
            <i className="mdi mdi-cached" />
            <span>{t('UPDATE_DELEGATION')}</span>
          </Button>
        </div>
      </div>
    </StakingContainer>
  );
}

export default ManageDelegations;
