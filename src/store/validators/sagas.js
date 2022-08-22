
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { fromWei } from 'web3-utils';

import {
  getValidatorAccountableSelfStakeSuccess,
  getValidatorAccountableTotalStakeSuccess,
  getValidatorDelegatedStakeSuccess,
  getValidatorTotalStakeSuccess,
  setCompoundRateKeeperExists,
  setInactiveValidators,
  setIsUserValidator,
  setMinimumValidatorsTimeLock,
  setValidatorMembers,
  setValidatorsTimeLocks,
  setValidatorWithdrawalInfo,
} from './action-creators';
import * as actionTypes from './action-types';

import { networkSelector, userAddressMetamask } from 'store/user-inf/selectors';

import {
  getIndexerInstance,
  getValidationRewardPoolsInstance,
  getValidatorsInstance,
} from 'contracts/contract-instance';
import { getBlockSealingAliasMap } from 'contracts/helpers/account-aliases-helper';
import { getValidator, getValidators, prepareValidatorsMonitoringData } from 'contracts/helpers/validators-helper';

import { networkConfigsMap } from 'constants/config';
import { TABLE_TYPES } from 'constants/tableTypes';
import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

function* getValidatorTotalStakeGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidatorsInstance);
    const validatorTotalStake = yield contract.getValidatorTotalStake(userAddress);
    yield put(getValidatorTotalStakeSuccess(fromWei(validatorTotalStake)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorDelegatedStakeGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);

    const contract = yield call(getValidatorsInstance);
    const validatorDelegatedStake = yield contract.instance.methods.getValidatorDelegatedStake(userAddress).call();
    yield put(getValidatorDelegatedStakeSuccess(fromWei(validatorDelegatedStake)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorAccountableTotalStakeGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidatorsInstance);
    const accountableTotalStake = yield contract.getAccountableTotalStake(userAddress);
    yield put(getValidatorAccountableTotalStakeSuccess(fromWei(accountableTotalStake)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorAccountableSelfStakeGenerator ({ address }) {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidatorsInstance);
    const accountableSelfStake = yield contract.getAccountableSelfStake(address ?? userAddress);
    yield put(getValidatorAccountableSelfStakeSuccess(fromWei(accountableSelfStake)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsWithdrawalInfoGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);
    const contract = yield call(getValidatorsInstance);
    const withdrawalInfo = yield contract.getWithdrawalInfo(userAddress);
    yield put(setValidatorWithdrawalInfo(withdrawalInfo));
  } catch (error) {
    captureError(error);
    yield put(setValidatorWithdrawalInfo(error));
  }
}

function* getValidatorsMembersGenerator ({
  tableType = TABLE_TYPES.validatorsWidened,
  indexerUrl = networkConfigsMap.testnet.indexerUrl,
}) {
  const network = yield select(networkSelector);
  try {
    const validatorsInstance = yield call(getValidatorsInstance);
    const shortList = yield validatorsInstance.getShortList();

    switch (tableType) {
      case TABLE_TYPES.validatorsWidened: {
        const validationRewardPoolsInstance = yield call(getValidationRewardPoolsInstance);
        const validators = yield getValidators(shortList);
        const aliasesMap = yield getBlockSealingAliasMap(
          validators.map((item) => item.address),
          network
        );
        const validatorsWithAlias = validators.map((member) => ({
          ...member,
          alias: aliasesMap[member.address],
        }));

        const preparedData = yield all(
          validatorsWithAlias.map((validator, idx) =>
            getValidator(validator, idx, validatorsInstance, validationRewardPoolsInstance)
          )
        );

        yield put(setValidatorMembers(tableType, preparedData));
        break;
      }
      case TABLE_TYPES.validatorsShort: {
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

function* getIsUserValidatorGenerator () {
  try {
    const userAddress = yield select(userAddressMetamask);

    const contract = yield call(getValidatorsInstance);
    const isInShortList = yield contract.isInShortList(userAddress);
    const isInLongList = yield contract.isInLongList(userAddress);
    const isValidator = [isInShortList, isInLongList].every(val => val);
    yield put(setIsUserValidator(isValidator));
  } catch (error) {
    captureError(error);
    yield put(setIsUserValidator(false));
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

function* getValidatorsMinimumTimeLockGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getMinimumBalance(address, dateToUnix());
    yield put(setMinimumValidatorsTimeLock(fromWei(data)));
  } catch (error) {
    captureError(error);
  }
}

function* getValidatorsTimeLocksGenerator ({ address }) {
  try {
    const contract = yield call(getValidatorsInstance);
    const data = yield contract.getTimeLocks(address);
    yield put(setValidatorsTimeLocks(data));
  } catch (error) {
    captureError(error);
  }
}

export default [
  takeEvery(actionTypes.GET_VALIDATORS_WITHDRAWAL_INFO, getValidatorsWithdrawalInfoGenerator),

  takeEvery(actionTypes.GET_VALIDATOR_ACCOUNTABLE_SELF_STAKE, getValidatorAccountableSelfStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATOR_ACCOUNTABLE_TOTAL_STAKE, getValidatorAccountableTotalStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATOR_DELEGATED_STAKE, getValidatorDelegatedStakeGenerator),
  takeEvery(actionTypes.GET_VALIDATOR_TOTAL_STAKE, getValidatorTotalStakeGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_MEMBERS, getValidatorsMembersGenerator),
  takeEvery(actionTypes.GET_IS_USER_VALIDATOR, getIsUserValidatorGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_MINIMUM_TIME_LOCK, getValidatorsMinimumTimeLockGenerator),
  takeEvery(actionTypes.GET_VALIDATORS_TIME_LOCKS, getValidatorsTimeLocksGenerator),
  takeEvery(actionTypes.GET_COMPOUND_RATE_KEEPER_EXISTS, getCompoundRateKeeperExistsGenerator),
];
