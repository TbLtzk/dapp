import styled from 'styled-components'

export const WrapContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
  & input {
    margin-top: 20px;
    margin-right: 30px;
  }
`

export const InfoWrap = styled.div`
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr);
    & > div {
      width: 95%;
      height: 95%;
    }
`

export const BlockWrap = styled.div`
  padding-bottom: 10px;
`

export const ValueWrap = styled.h4`
  width: ${(props) => props.width}
`

export const CalendarWraper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`
