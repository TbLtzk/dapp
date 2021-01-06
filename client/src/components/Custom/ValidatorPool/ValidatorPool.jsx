import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccTotalStake,
  getDelegatedStake,
  getOwnStake,
  getTotalStake,
} from 'store/actions/action-creaters/validators';
import { userAddressMetamask } from 'store/selectors/user-inf';
import {
  accTotalStakeSelector,
  delegatedStakeSelector,
  ownStakeSelector,
  totalStakeSelector,
} from 'store/selectors/validators';
import { useForm } from 'react-hook-form';
import { CustomBlockVP } from './styles';
import FormInput from '../../Base/Form/FormInput';
import { errorHandler } from '../../../func/useful';
import Button from '../../Base/Buttons/Button';
import Validators from '../../../contracts/Validators';

export default function ValidatorPool(props) {
  const { showTitle } = props;

  const { register: reg3, handleSubmit: submit3, errors: err3 } = useForm();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const totalStake = useSelector(totalStakeSelector);
  const ownStake = useSelector(ownStakeSelector);
  const delegatedStake = useSelector(delegatedStakeSelector);
  const accTotalStake = useSelector(accTotalStakeSelector);

  useEffect(() => {
    dispatch(getTotalStake(address));
    dispatch(getOwnStake(address));
    dispatch(getDelegatedStake(address));
    dispatch(getAccTotalStake(address));
  }, []);

  const setTotalStake = (formData) => {
    const validatorsCont = new Validators();
    validatorsCont.commitCollateral(address, formData.amount).then((res) => console.log(res));
  };

  return (
    <CustomBlockVP>
      { showTitle === false ? '' : (
        <p className="title">Validator Pool</p>
      )}
      <div>
        <span>Total Stake:</span>
        <span>
          {totalStake}
          Q
        </span>
      </div>
      <div>
        <span>Of which is Validator own Stake:</span>
        <span>
          {ownStake}
          Q
        </span>
      </div>
      <div>
        <span>Delegated Stake:</span>
        <span>
          {delegatedStake}
          Q
        </span>
      </div>
      <div>
        <span>Number of Delegators:</span>
        <span>? Addresses</span>
      </div>
      <div>
        <span>Accountable Stake:</span>
        <span>
          {accTotalStake}
          Q
        </span>
      </div>
      <div className="form-container" style={{ flexDirection: 'column' }}>
        <span style={{ marginBottom: '10px' }}><b>Set Total stake (Test only)</b></span>
        <div>
          <FormInput
            name="amount"
            type="number"
            placeholder="1Q"
            ref={reg3({ required: true })}
            valid={errorHandler(err3, 'amount')}
          />
          <Button
            type="outline"
            title="Set"
            width="auto"
            handleButton={submit3(setTotalStake)}
          />
        </div>
      </div>
    </CustomBlockVP>
  );
}

ValidatorPool.propTypes = {
  showTitle: PropTypes.bool,
};

ValidatorPool.defaultProps = {
  showTitle: false,
};
