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
      <p className="text-sm color-secondary">
        {`QUSD - ${interestRate.asset} ${t('BORROWING_FEE')}`}
      </p>
      <p ref={interestRateRef} className="text-lg font-semibold">0 %</p>
    </div>
  );
}

export default InterestRates;
