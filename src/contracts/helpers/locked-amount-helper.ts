import { TimeLockContractType } from 'typings/contracts';
import { TimeLockForm } from 'typings/time-locks';

import { getInstance } from 'contracts/contract-instance';

import { dateToUnix } from 'utils/date';
import { toWei } from 'utils/web3';

export async function purgeTimeLocks ({ contractType, address }: {
  contractType: TimeLockContractType;
  address: string;
}) {
  const contract = await getInstance(contractType)();
  return contract.purgeTimeLocks(address.toLowerCase());
}

export async function depositTimeLock (form: TimeLockForm) {
  const contract = await getInstance(form.contract)();
  return contract.depositOnBehalfOf(
    form.address.toLowerCase(),
    dateToUnix(form.startDate),
    dateToUnix(form.endDate),
    { value: toWei(form.amount) }
  );
}
