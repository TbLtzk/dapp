import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSetDelegatorsShare } from '../hooks';

import { useTransaction } from 'store/transaction/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import { formatPercent } from 'utils/numbers';
import { max, required } from 'utils/validators';

const StyledBlock = styled.div`
  .share-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

`;

function DelegatorsShare () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { isValidator } = useValidators();

  const { delegatorsShare } = useValidationRewards();
  const { setDelegatorsShare } = useSetDelegatorsShare();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(100)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('SET_DELEGATOR_SHARE_SUCCESS'),
        submitFn: () => setDelegatorsShare(amount),
        onSuccess: () => form.reset(),
      });
    }
  });

  return (
    <StyledBlock className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('Sharing')}</h3>
      </div>

      <div className="share-info block__content">
        <div className="">
          <p className="color-secondary text-md">{t('VALIDATOR_SHARE')}</p>
          <p className="color-primary text-md">{formatPercent(100 - delegatorsShare)}</p>
        </div>
        <div className="">
          <p className="color-secondary text-md">{t('DELEGATOR_SHARE')}</p>
          <p className="color-primary text-md">{formatPercent(delegatorsShare)}</p>
        </div>
      </div>

      <form
        noValidate
        className="block__content"
        onSubmit={form.submit}
      >
        <Input
          disabled={!isValidator}
          label={t('SET_DELEGATOR_SHARE')}
          {...form.fields.amount}
          type="number"
          placeholder="0%"
          max="100"
        />
        <Button
          className="submit-btn"
          type="submit"
          disabled={!form.isValid || !isValidator}
          style={{ width: '100px', margin: '10px 0 3px 0' }}
        >
          {t('SET')}
        </Button>
      </form>
    </StyledBlock>
  );
}

export default DelegatorsShare;
