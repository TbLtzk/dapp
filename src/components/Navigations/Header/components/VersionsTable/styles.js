import styled from 'styled-components';

export const TableStyle = styled.table`
  width: 100%;
  thead th, td {
    width: 50%;
    border-top: 0;
    border-bottom: 0;
    padding: 0 0 15px;
    ${(props) => props.theme.fontStyles.text.middle};
  }

  thead th {
    color: ${props => props.theme.colors.darkText};
  }

  td {
    color: ${props => props.theme.colors.darkText};
    font-weight: 500;
    line-height: 17px;
  }
`;

export const TableHeader = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.darkText};
  font-size: 20px;
  font-weight: 600;
`;
