import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import FormInput from 'components/Base/Form/FormInput';

import { symbol } from 'store/stable-coin/selectors';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { AUCTIONS_TYPES } from 'constants/statuses';

function CreateStep1 ({ activeTab, register, errors }) {
  const symbolType = useSelector(symbol);
  const [surplusLot, setSurplusLot] = useState('0');
  const [reserveLot, setReserveLot] = useState('0');

  useEffect(() => {
    getEPDRUint('governed.EPDR.QUSD_surplusLot', setSurplusLot);
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot);
  }, []);

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        return (
          <>
            <FormInput
              refType="address"
              name="address"
              placeholder="Address"
              label="Provide user address of vault holder, which shall be liquidated"
              error={errors.address?.message}
              register={register}
            />
            <FormInput
              refType="vault-id"
              name="vault-id"
              placeholder="Vault ID"
              label="Provide the Vault ID to be liquidated"
              error={errors['vault-id']?.message}
              register={register}
            />
            <FormInput
              refType="bid"
              name="bid"
              placeholder="Bid"
              label={`Provide your initial Bid in ${symbolType}`}
              error={errors.bid?.message}
              register={register}
            />
          </>
        );
      case AUCTIONS_TYPES.systemDebt:
        return (
          <>
            <h5>Debt Auction Lot</h5>
            <p>{reserveLot + 'Q'}</p>
            <FormInput
              refType="bid"
              name="bid"
              placeholder="Bid"
              label={`Provide your initial Bid in ${symbolType}`}
              error={errors.bid?.message}
              register={register}
            />
          </>
        );
      case AUCTIONS_TYPES.systemSurplus:
        return (
          <>
            <h5>Surplus Auction Lot: </h5>
            <p>{surplusLot + ' ' + symbolType}</p>
            <FormInput
              refType="bid"
              name="bid"
              placeholder="Bid"
              label="Provide your initial Bid in Q"
              error={errors.bid?.message}
              register={register}
            />
          </>
        );
      default:
        return null;
    }
  }, [activeTab, register, errors, reserveLot, surplusLot]);

  return <div>{switchContentOnTypeProposal()}</div>;
}

export default CreateStep1;
