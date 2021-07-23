import React from 'react'
import PageWrap from 'components/Base/PageWrap';


import AddressForm from './components/AddressForm';
import { InfoWrap } from './styles'
import BalancePage from './components/BalancePage';

function TimeLocks() {

    const array = [
        {
          id: 1,
          amount: '10',
          startDate: '13.07.21 21:30:33',
          endDate: '16.07.21 21:30:33',
        },
        {
          id: 2,
          amount: '103',
          startDate: '13.07.21 21:30:33',
          endDate: '16.07.21 21:30:33',
        },
        {
          id: 3,
          amount: '101',
          startDate: '13.07.21 21:30:33',
          endDate: '15.07.21 21:30:33',
        },
        {
          id: 4,
          amount: '120',
          startDate: '13.07.21 21:30:33',
          endDate: '22.07.21 21:30:33',
        },
        {
          id: 5,
          amount: '510',
          startDate: '13.07.21 21:30:33',
          endDate: '15.07.21 21:30:33',
        },
        
      ];
      
    const handleRefresh = (userAddress) => {
        console.log(userAddress)
    }

    return (
        <PageWrap headerTitle='Time Locks'>
            <AddressForm setAddressRefresh={handleRefresh}/>
            <InfoWrap>
                <BalancePage title='Q Vault account balance' locksArray={array} />
                <BalancePage title='Root stake balance' locksArray={array}/>
                <BalancePage title='Validator stake balance' locksArray={array}/>
                <BalancePage title='Vesting balance' locksArray={array} />
            </InfoWrap>
        </PageWrap>
    )
}

export default TimeLocks
