import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';
import MenuDropdown from 'ui/MenuDropdown';
import Modal from 'ui/Modal';

import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';
import ValidatorsTable from 'components/Custom/Tables/ValidatorsTable';

import StakerRewardPool from './components/StakerRewardPool';
import ValidatorBalanceInfo from './components/ValidatorBalanceInfo';
import ValidatorForms from './components/ValidatorForms';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  getAccountableTotalStake,
  getIsUserValidator,
  getMinimumValidatorsTimeLock,
  getValidatorWithdrawalInfo,
} from 'store/validators/action-creators';

import TABLE_TYPES from 'constants/tableTypes';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-ranking',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function ValidatorStaking () {
  const [menuOpen, setMenuOpen] = useState(false);

  const [modalForm, setModalForm] = useState('');

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getAccountBalance(address));
    dispatch(getIsUserValidator(address));
    dispatch(getMinimumValidatorsTimeLock(address));
    dispatch(getAccountableTotalStake(address));
    dispatch(getValidatorWithdrawalInfo(address));
  }, [dispatch]);

  const handleFormModalOpen = (id) => {
    setModalForm(id);
    setMenuOpen(false);
  };

  const handleFormModalClose = () => {
    setModalForm(null);
  };

  const menuItems = [
    {
      id: FORM_TYPES.stakeToRanking,
      title: 'Stake to Ranking',
      func: () => handleFormModalOpen(FORM_TYPES.stakeToRanking),
    },
    {
      id: FORM_TYPES.announceWithdrawal,
      title: 'Announce Withdrawal',
      func: () => handleFormModalOpen(FORM_TYPES.announceWithdrawal),
    },
    {
      id: FORM_TYPES.withdrawFromRanking,
      title: 'Withdraw from Ranking',
      func: () => handleFormModalOpen(FORM_TYPES.withdrawFromRanking),
    },
  ];

  const formType = menuItems.find((item) => item.id === modalForm) || menuItems[0];

  return (
    <>
      <CustomBlock>
        <div className="card_header">
          <div className="card-title">
            <h2 className="text-h2">Manage Balance</h2>
            <InfoTooltip topic="validator-staking" placement="top" />
          </div>
          <MenuDropdown
            right
            open={menuOpen}
            menuItems={menuItems}
            onToggle={setMenuOpen}
          />
          <Modal
            title={formType.title}
            open={Boolean(modalForm)}
            onClose={handleFormModalClose}
          >
            <ValidatorForms formType={modalForm} />
          </Modal>

          <StakerRewardPool />
        </div>

        <ValidatorBalanceInfo />
      </CustomBlock>
      <ValidatorsTable
        bottom
        type="with-total"
        tableType={TABLE_TYPES.validatorsWidened}
        buttons={
          <div>
            <Link to="/q-vault">
              <Button alwaysEnabled look="white">
                <i className="mdi mdi-arrow-right" />
                <span>{t('GO_TO_Q_VAULT')}</span>
              </Button>
            </Link>
          </div>
        }
      />
    </>
  );
}

export default ValidatorStaking;
