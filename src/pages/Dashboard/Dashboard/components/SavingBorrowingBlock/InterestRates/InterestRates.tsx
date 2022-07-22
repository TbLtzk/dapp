import { useTranslation } from 'react-i18next';

import { BorrowAssetsRateAndFee } from 'typings/defi';

import useAnimateNumber from 'hooks/useAnimateNumber';

interface Props {
  interestRate: BorrowAssetsRateAndFee;
}

function InterestRates ({ interestRate }: Props) {
  const { t } = useTranslation();
  const interestRateRef = useAnimateNumber(interestRate?.borrowingFee, ' %');

  return (
    <div>
      <h5>{`QUSD - ${interestRate.asset} ${t('BORROWING_FEE')}`}</h5>
      <p ref={interestRateRef}>0 %</p>
    </div>
  );
}

export default InterestRates;
