import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SavingDetailsContainer } from './styles';

import { savingAviableToDepositSelector, savingBalanceDetailsSelector } from 'store/saving-assets/selectors';

import { fN } from 'func/useful';

interface Props {
  depositAsset: string;
  interestAsset: string;
}

function SavingDetails ({ depositAsset, interestAsset }: Props) {
  const { t } = useTranslation();

  const availableToDeposit = useSelector(savingAviableToDepositSelector);
  const { interestRate, currentBalance, estimatedInterest } =
    useSelector(savingBalanceDetailsSelector);

  const detailsGroups = [
    {
      title: t('DEPOSIT'),
      items: [
        {
          name: t('ASSET'),
          value: depositAsset
        },
        {
          name: t('SAVING_BALANCE'),
          value: fN(currentBalance)
        },
        {
          name: t('AVAILABLE_TO_DEPOSIT'),
          value: fN(availableToDeposit)
        }
      ]
    },
    {
      title: t('INTEREST'),
      items: [
        {
          name: t('RECEIVE_ASSET'),
          value: interestAsset
        },
        {
          name: t('YEARLY_EXPECTED_REWARD'),
          value: fN(estimatedInterest)
        },
        {
          name: t('SAVING_REWARD'),
          value: `${fN(interestRate)}%`
        }
      ]
    },
  ];

  return (
    <SavingDetailsContainer>
      {detailsGroups.map((group, i) => (
        <div
          key={String(i)}
          className="details-group"
        >
          <h3 className="text-lg font-semibold">{group.title}</h3>
          <div className="details-group-items">
            {group.items.map((item) => (
              <div key={item.name}>
                <p className="text-sm font-light">{item.name}</p>
                <p className="text-md">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </SavingDetailsContainer>
  );
}

export default SavingDetails;
