import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';

import useVoteDelegation from 'hooks/useVoteDelegation';

import AnnounceForm from './components/AnnounceForm';

import { getDelegationInfo, setNewVotingAgent } from 'store/q-vault/action-creators';
import { isPendingDelegation, receivedWeight, votingAgentPassOverTime } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { fromWei } from 'func/balance';
import { getNowTimestamp, remainDate } from 'func/convertDate';

function DelegateVoting () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const weight = useSelector(receivedWeight);
  const isPending = useSelector(isPendingDelegation);
  const time = useSelector(votingAgentPassOverTime);

  const { delegateInfo } = useVoteDelegation(weight);

  useEffect(() => {
    dispatch(getDelegationInfo(address));
  }, []);

  async function handleDelegate () {
    dispatch(setNewVotingAgent());
  }

  return (
    <CustomBlock>
      <h1>
        <span>{t('DELEGATE_VOTING_POWER')}</span>
        <InfoTooltip topic="delegate-voting-power" />
      </h1>
      <h5>{t('TOTAL_VOTING_WEIGHT')}</h5>
      <p>{fromWei(weight)}</p>
      <h5>{t('CURRENT_AGENT')}</h5>
      <p>{delegateInfo}</p>

      {!isPending
        ? null
        : time - getNowTimestamp() > 0
          ? (
            <>
              <h5>{t('DELEGATION_INFO')}</h5>
              <h4>{`${t('IT_CAN_BE_FINALIZED_AFTER')} ${remainDate(time)}`}</h4>
            </>
          )
          : (
            <div className="card_block">
              <div>
                <h5>{t('CONFIRM_ANNOUNCED_VOTING_AGENT')}</h5>
                <p style={{ marginBottom: 0 }}>{t('THIS_DELEGATION_INFO_IS_CURRENTLY_PENDING')}</p>
              </div>
              <div>
                <Button compact onClick={handleDelegate}>
                  <i className="mdi mdi-chart-pie" />
                  <span>{t('CONFIRM')}</span>
                </Button>
              </div>
            </div>
          )}
      <div className="card__line" />
      <AnnounceForm />
    </CustomBlock>
  );
}

export default DelegateVoting;
