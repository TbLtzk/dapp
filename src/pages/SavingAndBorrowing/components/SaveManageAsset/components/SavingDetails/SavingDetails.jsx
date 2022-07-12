import { useSelector } from 'react-redux';

import { SavingDetailsContainer } from './styles';

import { savingAviableToDepositSelector, savingBalanceDetailsSelector } from 'store/saving-assets/selectors';

import { fN } from 'func/useful';

function SavingDetails ({ depositAsset, interestAsset }) {
  const availableToDeposit = useSelector(savingAviableToDepositSelector);
  const { interestRate, currentBalance, estimatedInterest } =
    useSelector(savingBalanceDetailsSelector);

  const detailsGroups = [
    {
      title: 'Deposit',
      items: [
        {
          name: 'Asset',
          value: depositAsset
        },
        {
          name: 'Saving Balance',
          value: fN(currentBalance)
        },
        {
          name: 'Available to Deposit',
          value: fN(availableToDeposit)
        }
      ]
    },
    {
      title: 'Interest',
      items: [
        {
          name: 'Receive Asset',
          value: interestAsset
        },
        {
          name: 'Yearly Expected Reward',
          value: fN(estimatedInterest)
        },
        {
          name: 'Saving Reward (p.a)',
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
