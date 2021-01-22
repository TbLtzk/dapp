import { put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from 'store/actions/action-types/validators';
import {
  setError, setDelegatorsShare, getDelegatorsShare, setTotalStake, setOwnStake,
  setDelegatedStake, setAccTotalStake, setInterestRate, getInterestRate,
  getValidatorMembersSuccess, getValidatorMembersError,
} from 'store/actions/action-creaters/validators';
import Validators from '../../contracts/Validators';
import { web3 } from '../../contracts/config/drizzle-config';

let contractInstance = null;

function getContractInstance() {
  if (contractInstance === null) {
    contractInstance = new Validators();
  }
  return contractInstance;
}

function* getDelegatorsShareGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    const data = yield contract.getDelegatorsShare(address);

    yield put(setDelegatorsShare(data));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* getTotalStakeGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    let data = yield contract.getValidatorTotalStake(address);
    data = web3.utils.fromWei(data);

    yield put(setTotalStake(data));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* getOwnStakeGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    let data = yield contract.getValidatorsOwnStake(address);
    data = web3.utils.fromWei(data);

    yield put(setOwnStake(data));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* getDelegatedStakeGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    let data = yield contract.getValidatorDelegatedStake(address);
    data = web3.utils.fromWei(data);

    yield put(setDelegatedStake(data));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* getAccTotalStakeGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    let data = yield contract.getAccountableTotalStake(address);
    data = web3.utils.fromWei(data);

    yield put(setAccTotalStake(data));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* getInterestRateGenerator({ address }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    const data = yield contract.getInterestRate(address);
    console.log(data);

    yield put(setInterestRate(data));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* setDelegatorsShareGenerator({ address, uintPercent }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    const data = yield contract.setDelegatorsShare(address, uintPercent);

    if (data.status === true) yield put(getDelegatorsShare(address));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* setInterestRateGenerator({ address, uintPercent }) {
  try {
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADING });

    const contract = getContractInstance();
    const data = yield contract.setInterestRate(address, uintPercent);

    if (data.status === true) yield put(getInterestRate(address));
    yield put({ type: actionTypes.SET_VAL_DATA_IS_LOADED });
  } catch (err) {
    console.error('Validators.Error', err);
    yield put(setError(err.message));
  }
}

function* getValidatorsMembers() {
  try {
    const contract = getContractInstance();
    const data = yield contract.getPositiveValidatorStake();
    // console.log("data", data.slice().reverse());
    yield put(getValidatorMembersSuccess(data));
  } catch (err) {
    console.error('ValidatorsMember.Error', err);
    yield put(getValidatorMembersError(err.message));
  }
}

export default [
  takeEvery(actionTypes.GET_VAL_DELEGATORS_SHARE, getDelegatorsShareGenerator),
  takeEvery(actionTypes.GET_VAL_TOTAL_STAKE, getTotalStakeGenerator),
  takeEvery(actionTypes.GET_VAL_OWN_STAKE, getOwnStakeGenerator),
  takeEvery(actionTypes.GET_VAL_DELEGATED_STAKE, getDelegatedStakeGenerator),
  takeEvery(actionTypes.GET_VAL_ACC_TOTAL_STAKE, getAccTotalStakeGenerator),
  takeEvery(actionTypes.GET_VAL_INTEREST_RATE, getInterestRateGenerator),

  takeEvery(actionTypes.SET_VAL_DELEGATORS_SHARE_SEND, setDelegatorsShareGenerator),
  takeEvery(actionTypes.SET_VAL_INTEREST_RATE_SEND, setInterestRateGenerator),

  takeEvery(actionTypes.GET_VALIDATORS_MEMBERS, getValidatorsMembers),
];
