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
import { CustomBlockVP } from './styles';
import { fN } from 'func/useful';

export default function ValidatorPool(props) {
  const { showTitle } = props;

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

  return (
    <CustomBlockVP>
      { showTitle === false ? '' : (
        <p className="title">Validator Pool</p>
      )}
      <div>
        <span>Total Stake:</span>
        <span>
          {fN(totalStake)}
          Q
        </span>
      </div>
      <div>
        <span>Of which is Validator own Stake:</span>
        <span>
          {fN(ownStake)}
          Q
        </span>
      </div>
      <div>
        <span>Delegated Stake:</span>
        <span>
          {fN(delegatedStake)}
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
          {fN(accTotalStake)}
          Q
        </span>
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
