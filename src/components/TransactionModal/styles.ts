import includes from 'lodash/includes';
import styled from 'styled-components';

import { getToastColor } from 'components/Toast/colors';
import { ToastType, toastTypes } from 'components/Toast/Toast';

import { TransactionType } from './TransactionModal';

export const TransactionModalContainer = styled.div<{ transactionType: TransactionType }>`
  display: flex;
  height: 250px;
  width: 100%;
  padding-top: ${({ transactionType }) => (transactionType === 'error' ? '30px' : '10px')};

  .transaction-loading {
    margin-top: 10px;
    height: 100%;
  }

  p {
    padding-top: 10px;
  }

  .centered {
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }

  i {
    color: ${({ theme, transactionType }) =>
      includes(toastTypes, transactionType) && getToastColor(theme, transactionType as ToastType)};
    font-size: 70px;
  }
`;
