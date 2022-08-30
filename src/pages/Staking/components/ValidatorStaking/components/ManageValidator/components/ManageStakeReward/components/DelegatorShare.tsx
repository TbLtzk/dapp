import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSetDelegatorShare } from '../hooks';

import { delegatorsShareSelector, validatorShareSelector } from 'store/validation-reward-pools/selectors';
import { isUserValidatorSelector } from 'store/validators/selectors';

import { formatPercent } from 'utils/numbers';
import { max, required } from 'utils/validators';

const StyledBlock = styled.div`
  .share-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

`;

function DelegatorShare () {
  const { t } = useTranslation();

  const { setDelegatorShare } = useSetDelegatorShare();
  const isUserValidator = useSelector(isUserValidatorSelector);
  const delegatorShare = useSelector(delegatorsShareSelector);
  const validatorShare = useSelector(validatorShareSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(100)] },
    onSubmit: ({ amount }) => {
      setDelegatorShare(amount, t('SET_DELEGATOR_SHARE_SUCCESS'), form);
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
          <p className="color-primary text-md">{formatPercent(validatorShare)}</p>
        </div>
        <div className="">
          <p className="color-secondary text-md">{t('DELEGATOR_SHARE')}</p>
          <p className="color-primary text-md">{formatPercent(delegatorShare)}</p>
        </div>
      </div>

      <form
        noValidate
        className="block__content"
        onSubmit={form.submit}
      >
        <Input
          disabled={!isUserValidator}
          label={t('SET_DELEGATOR_SHARE')}
          {...form.fields.amount}
          type="number"
          placeholder="0%"
          max="100"
        />
        <Button
          className="submit-btn"
          type="submit"
          disabled={!form.isValid || !isUserValidator}
          style={{ width: '100px', margin: '10px 0 3px 0' }}
        >
          {t('SET')}
        </Button>
      </form>
    </StyledBlock>
  );
}

export default DelegatorShare;
