import styled from 'styled-components'

export const PurgeSlashingContainer = styled.div`
  display: flex;
  height: 80px;
  flex-direction: column;
  align-items: flex-start;
  & > :first-child {
    margin-bottom: 15px;
  }

  @media screen and (min-width: 1370px) {
    flex-direction: row;
    height: 45px;

    align-items: center;

    & > :first-child {
      margin-bottom: 0;
      margin-right: 15px;
    }
  }
`
