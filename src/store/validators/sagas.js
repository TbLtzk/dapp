import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import {
  getAccountableTotalStake,
  getCompoundRateKeeperExists,
  getInterestRate,
  getIsUserValidator,
  getValidatorMembers,
  getValidatorWithdrawalInfo,
  setAccountableTotalStake,
  setCompoundRateKeeperExists,
  setDelegatedStake,
  setInactiveValidators,
  setIsUserValidator,
  setMinimumValidatorsTimeLock,
  setOwnStake,
  setSelfStake,
  setTotalStake,
  setValidatorMembers,
  setValidatorsTimeLocks,
  setValidatorWithdrawalInfo,
} from './action-creators';
import * as actionTypes from './action-types';

import { getAccountBalance } from 'store/q-vault/action-creators';
import {
  setTransactionLoading,
  setTransactionLoadingError,
  setTransactionLoadingSuccess,
} from 'store/transaction-handler/actions';
import { networkSelector } from 'store/user-inf/selectors';

import {
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getBlockSealingAliasMap } from 'contracts/helpers/account-aliases-helper';
import { getValidator, getValidators, prepareValidatorsMonitoringData } from 'contracts/helpers/validators-helper';

import { networkConfigsMap } from 'constants/config';
import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { TABLE_TYPES } from 'constants/tableTypes';
import { fromWei, toWei } from 'utils/balance';
import { getNowTimestamp } from 'utils/convertDate';
import { captureError, getErrorMessage, getSuccessMessage } from 'utils/errors';
import { addIndex } from 'utils/useful';

function* getValidatorsWithdrawalInfoGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getWithdrawalInfo(address);
    yield put(setValidatorWithdrawalInfo(data));
  } catch (error) {
    captureError(error);
    yield put(setValidatorWithdrawalInfo({}));
  }
}

function* getValidatorsTotalStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getValidatorTotalStake(address);
    yield put(setTotalStake(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsOwnStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getAccountableSelfStake(address);
    yield put(setOwnStake(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsDelegatedStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.instance.methods.getValidatorDelegatedStake(address).call();
    yield put(setDelegatedStake(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsAccountableTotalStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getAccountableTotalStake(address);
    yield put(setAccountableTotalStake(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsAccountableSelfStake ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getAccountableSelfStake(address);
    yield put(setSelfStake(Number(fromWei(data))));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsMembersGenerator ({
  tableType = TABLE_TYPES.validatorsWidened,
  indexerUrl = networkConfigsMap.testnet.indexerUrl,
}) {
  const network = yield select(networkSelector);
  try {
    const validatorsInstance = yield call(getValidatorsInstance);
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened: {
        const validationRewardPoolsInstance = yield call(getValidationRewardPoolsInstance);
        const validators = yield getValidators(validatorsInstance);
        const aliasesMap = yield getBlockSealingAliasMap(
          validators.map((item) => item.validator),
          network
        );
        const preparedData = yield all(
          validators.map((validator, idx) =>
            getValidator(validator, idx, validatorsInstance, validationRewardPoolsInstance)
          )
        );
        const members = preparedData.map((member) => ({
          ...member,
          alias: aliasesMap[member.validator],
        }));
        yield put(setValidatorMembers(tableType, members));
        break;
      }
      case TABLE_TYPES.validatorsShort: {
        const shortList = yield validatorsInstance.getShortList();
        const aliasesMap = yield getBlockSealingAliasMap(
          shortList.map((item) => item.address),
          network
        );
        const preparedShortList = shortList.map((user) => ({
          validator: user.address,
          alias: aliasesMap[user.address],
          amount: user.balance,
        }));
        yield put(setValidatorMembers(tableType, preparedShortList));
        break;
      }
      case TABLE_TYPES.validatorsMonitoring: {
        const indexer = yield getIndexerInstance(indexerUrl);

        const shortList = yield validatorsInstance.getShortList();
        const validatorAdresses = shortList.map((user) => user.address);

        const inactiveValidators = yield indexer.getInactiveValidators(validatorAdresses);
        const aliasesMap = yield getBlockSealingAliasMap(validatorAdresses, network);

        const preparedShortList = yield all(
          shortList.map((member) => prepareValidatorsMonitoringData(indexer, member))
        );

        const members = preparedShortList.map((member) => ({
          ...member,
          alias: aliasesMap[member.validator],
        }));

        yield put(setInactiveValidators(inactiveValidators));
        yield put(setValidatorMembers(tableType, members));
        break;
      }
    }
  } catch (error) {
    captureError(error);
  }
}

function* getIsUserValidatorGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.isInShortList(address);
    yield put(setIsUserValidator(data));
  } catch (error) {
    captureError(error);
    yield put(setIsUserValidator(false));
  }
}

function* getValidatorsMinimumTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getMinimumBalance(address, getNowTimestamp());
    yield put(setMinimumValidatorsTimeLock(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getTimeLocks(address);
    yield put(setValidatorsTimeLocks(addIndex(data)));
  } catch (error) {
    captureError(error);
  }
}
function* getCompoundRateKeeperExistsGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getValidationRewardPoolsInstance);
    const compoundRateKeeperExists = yield contract.compoundRateKeeperExists(userAddress);
    yield put(setCompoundRateKeeperExists(compoundRateKeeperExists));
  } catch (error) {
    captureError(error);
  }
}

function* setValidatorsInterestRateGenerator ({ address, uintPercent, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    const transaction = yield contract.setInterestRate(address, uintPercent);

    yield put(getInterestRate(address));
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}
function* setValidatorsCommitStakeGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    const transaction = yield contract.commitStake({
      from: address,
      value: toWei(amountQ),
    });

    yield put(getValidatorMembers());
    yield put(getIsUserValidator(address));
    yield put(getAccountableTotalStake(address));
    yield put(getAccountBalance(address));
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.validatorsStaking, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setValidatorsAnnounceWithdrawalGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);

    const transaction = yield contract.announceWithdrawal(toWei(amountQ), { from: address });

    yield put(getValidatorWithdrawalInfo(address));
    yield put(getAccountableTotalStake(address));
    yield put(getAccountBalance(address));
    yield put(getValidatorMembers());
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.validatorsStaking, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setValidatorsWithdrawGenerator ({ address, amountQ, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    const transaction = yield contract.withdraw(toWei(amountQ), address);

    yield put(getIsUserValidator(address));
    yield put(getAccountableTotalStake(address));
    yield put(getAccountBalance(address));
    yield put(getValidatorMembers());
    yield put(getValidatorWithdrawalInfo(address));
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(formTypes.validatorsStaking, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

function* setValidatorsEnterShortListGenerator ({ address, label }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    const transaction = yield contract.enterShortList({ from: address });

    yield put(getIsUserValidator(address));
    yield put(getValidatorMembers());
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, label)));
  } catch (error) {
    captureError(error);
    yield put(setTransactionLoadingError(getErrorMessage(error)));
  }
}

export default [
  takeEvery(actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO, getValidatorsWithdrawalInfoGenerator),

  takeEvery(actionTypes.SET_VALIDATORS_COMMIT_STAKE, setValidatorsCommitStakeGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_ANNOUNCE_WITHDRAWAL, setValidatorsAnnounceWithdrawalGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_WITHDRAW, setValidatorsWithdrawGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_ENTER_SHORT_LIST, setValidatorsEnterShortListGenerator),
  takeEvery(actionTypes.SET_VALIDATORS_INTEREST_RATE_SEND, setValidatorsInterestRateGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_TOTAL_STAKE, getValidatorsTotalStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_OWN_STAKE, getValidatorsOwnStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_DELEGATED_STAKE, getValidatorsDelegatedStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_ACCOUNTABLE_TOTAL_STAKE, getValidatorsAccountableTotalStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_SELF_STAKE, getValidatorsAccountableSelfStake),

  takeEvery(actionTypes.GET_VALIDATORS_MEMBERS, getValidatorsMembersGenerator),
  takeEvery(actionTypes.GET_IS_USER_VALIDATOR, getIsUserValidatorGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_MINIMUM_TIME_LOCK, getValidatorsMinimumTimeLockGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_TIME_LOCKS, getValidatorsTimeLocksGenerator),
  takeEvery(actionTypes.GET_COMPOUND_RATE_KEEPER_EXISTS, getCompoundRateKeeperExistsGenerator),
];
