import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CopyToClipboard from 'components/Base/CopyToClipboard';
import FormInput from 'components/Base/Form/FormInput';

import { symbol } from 'store/stable-coin/selectors';

import { fieldTypes } from 'constants/fieldTypes';
import { AUCTIONS_TYPES } from 'constants/statuses';
import { BN } from 'func/useful';

function CreateStep1 ({ activeTab, register, errors, raisingBid, watch, allowance, setApproveButton }) {
  const symbolType = useSelector(symbol);

  const onChangeInput = async (value) => {
    const moreThanAllowance = BN(value).comparedTo(allowance) === 1;
    if (moreThanAllowance) {
      setApproveButton(true);
    } else {
      setApproveButton(false);
    }
  };

  useEffect(() => {
    onChangeInput(watch('bid'));
  }, [watch]);

  const switchContentOnTypeProposal = useCallback(() => {
    const symbol = activeTab === AUCTIONS_TYPES.systemSurplus ? 'Q' : symbolType;
    const tabLabel = {
      [AUCTIONS_TYPES.liquidation]: `Provide a Bid for this auction in ${symbol}`,
      [AUCTIONS_TYPES.systemDebt]: `Provide your Bid in ${symbol}`,
      [AUCTIONS_TYPES.systemSurplus]: `Provide a Bid for this auction in ${symbol}`
    }[activeTab];

    if (!tabLabel) return null;

    return (
      <>
        <h4>{tabLabel}</h4>
        <h4>
          Minimum bid:
          <CopyToClipboard valueToCopy={raisingBid}>
            {raisingBid}
          </CopyToClipboard>
          {' '}
          {symbol}
        </h4>
        <FormInput
          invertedColors
          refType={fieldTypes.bid}
          name="bid"
          placeholder="Bid"
          error={errors.bid?.message}
          register={register}
        />
      </>
    );
  }, [activeTab, register, errors]);

  return <div>{switchContentOnTypeProposal()}</div>;
}

export default CreateStep1;
