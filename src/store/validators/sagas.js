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
} from 'store/transaction-handler/action-creators';
import { networkSelector } from 'store/user-inf/selectors';

import {
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getValidator, getValidators, prepareValidatorsMonitoringData } from 'contracts/helpers/validators-helper';

import formTypes from 'constants/form-types';
import { TRANSACTION_TYPES } from 'constants/statuses';
import TABLE_TYPES from 'constants/tableTypes';
import { fromWei, toWei } from 'func/balance';
import { getNowTimestamp } from 'func/convertDate';
import ErrorHandler from 'func/ErrorHandler';
import { addIndex, getIndexerUrlDependsOnChainId } from 'func/useful';

function * getValidatorsWithdrawalInfoGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getWithdrawalInfo(address);
    yield put(setValidatorWithdrawalInfo(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(setValidatorWithdrawalInfo({}));
  }
}

function * getValidatorsTotalStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getValidatorTotalStake(address);
    yield put(setTotalStake(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getValidatorsOwnStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getAccountableSelfStake(address);
    yield put(setOwnStake(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getValidatorsDelegatedStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.instance.methods.getValidatorDelegatedStake(address).call();
    yield put(setDelegatedStake(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getValidatorsAccountableTotalStakeGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getAccountableTotalStake(address);
    yield put(setAccountableTotalStake(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getValidatorsAccountableSelfStake ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getAccountableSelfStake(address);
    yield put(setSelfStake(Number(fromWei(data))));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getValidatorsMembersGenerator ({ tableType = TABLE_TYPES.validatorsWidened }) {
  try {
    const validatorsInstance = yield call(getValidatorsInstance);
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened: {
        const validationRewardPoolsInstance = yield call(getValidationRewardPoolsInstance);
        const validators = yield getValidators(validatorsInstance);
        const preparedData = yield all(
          validators.map((validator, idx) =>
            getValidator(validator, idx, validatorsInstance, validationRewardPoolsInstance)
          )
        );
        yield put(setValidatorMembers(tableType, preparedData));
        break;
      }
      case TABLE_TYPES.validatorsShort: {
        const shortList = yield validatorsInstance.getShortList();
        const preparedShortList = shortList.map((user) => ({ validator: user.address, amount: user.balance }));
        yield put(setValidatorMembers(tableType, preparedShortList));
        break;
      }
      case TABLE_TYPES.validatorsMonitoring: {
        const network = yield select(networkSelector);
        const indexerUrl = getIndexerUrlDependsOnChainId(network);
        const indexer = yield getIndexerInstance(indexerUrl);

        const shortList = yield validatorsInstance.getShortList();
        const inactiveValidators = yield indexer.getInactiveValidators(shortList.map((user) => user.address));

        const preparedShortList = yield all(
          shortList.map((member) => prepareValidatorsMonitoringData(indexer, member))
        );
        yield put(setInactiveValidators(inactiveValidators));
        yield put(setValidatorMembers(tableType, preparedShortList));
        break;
      }
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getIsUserValidatorGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.isInShortList(address);
    yield put(setIsUserValidator(data));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    yield put(setIsUserValidator(false));
  }
}

function * getValidatorsMinimumTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getMinimumBalance(address, getNowTimestamp());
    yield put(setMinimumValidatorsTimeLock(fromWei(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * getValidatorsTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getTimeLocks(address);
    yield put(setValidatorsTimeLocks(addIndex(data)));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}
function * getCompoundRateKeeperExistsGenerator () {
  try {
    const { userAddress } = yield select((state) => state.userInf);
    const contract = yield call(getValidationRewardPoolsInstance);
    const compoundRateKeeperExists = yield contract.compoundRateKeeperExists(userAddress);
    yield put(setCompoundRateKeeperExists(compoundRateKeeperExists));
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function * setValidatorsInterestRateGenerator ({ address, uintPercent }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    yield contract.setInterestRate(address, uintPercent);

    yield put(getInterestRate(address));
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}
function * setValidatorsCommitStakeGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    yield contract.commitStake({
      from: address,
      value: toWei(amountQ),
    });

    yield put(getValidatorMembers());
    yield put(getIsUserValidator(address));
    yield put(getAccountableTotalStake(address));
    yield put(getAccountBalance(address));
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess({ type: formTypes.validatorsStaking }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setValidatorsAnnounceWithdrawalGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);

    yield contract.announceWithdrawal(toWei(amountQ), { from: address });

    yield put(getValidatorWithdrawalInfo(address));
    yield put(getAccountableTotalStake(address));
    yield put(getAccountBalance(address));
    yield put(getValidatorMembers());
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess({ type: formTypes.validatorsStaking }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setValidatorsWithdrawGenerator ({ address, amountQ }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    yield contract.withdraw(toWei(amountQ), address);

    yield put(getIsUserValidator(address));
    yield put(getAccountableTotalStake(address));
    yield put(getAccountBalance(address));
    yield put(getValidatorMembers());
    yield put(getValidatorWithdrawalInfo(address));
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess({ type: formTypes.validatorsStaking }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
  }
}

function * setValidatorsEnterShortListGenerator ({ address }) {
  try {
    yield put(setTransactionLoading());

    const contract = yield call(getValidatorsInstance);
    yield contract.enterShortList({ from: address });
    yield put(getIsUserValidator(address));
    yield put(getValidatorMembers());
    yield put(getCompoundRateKeeperExists());

    yield put(setTransactionLoadingSuccess({ message: 'Success!' }));
  } catch (error) {
    const errorMsg = ErrorHandler.process(error);
    yield put(setTransactionLoadingError(errorMsg));
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
