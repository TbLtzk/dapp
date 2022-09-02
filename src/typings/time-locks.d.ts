import { TimeLockContractType } from './contracts';

export interface TimeLockForm {
  contract: TimeLockContractType;
  address: string;
  startDate: Date;
  endDate: Date;
  amount: string;
}
