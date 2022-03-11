import styled from 'styled-components'

export const WrapContainer = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  max-width: 70%;

  & input {
    margin-right: 30px;
  }
  & button {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1600px) {
    max-width: 100%;
  }
`

export const BlockWrap = styled.div`
  padding-bottom: 10px;
`

export const ValueWrap = styled.h4`
  width: ${(props) => props.width};
`

export const CalendarWraper = styled.div`
  display: flex;
  justify-content: space-between;
`
