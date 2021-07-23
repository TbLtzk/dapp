import styled from 'styled-components';

export const WrapContainer = styled.div`
  display: flex;
  max-width: 80%;
  & input {
    margin-top: 20px;
    margin-right: 30px;
  }
`;

export const InfoWrap = styled.div`
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    & div {
      width: 95%;
    }
`;

export const BlockWrap = styled.div`
  padding-bottom: 10px;
`

export const TableTR = styled.tr`
  text-align: center;
`

export const ValueWrap = styled.h4`
  width: ${(props) => props.width}
`

export const Button = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  background-color: #7856F0;
  outline: none;
  border: none;
  color: white;
  font-size: 10px;
  cursor: pointer;
`