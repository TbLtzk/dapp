import styled from 'styled-components'
import { ButtonCustom } from 'components/Base/Buttons/Button/styles'

export const ButtonSlideForm = styled.form`
position: relative;

.form-group {
  flex-direction: column;
  input {
    height: 46px;
  }
}
`

export const BtnSlide = styled(ButtonCustom)`
height: 46px;
position: absolute;
width: 100%;
top: 0;
right: 0;
font-weight: 600;
font-size: 14px;

&.enabled {
  width: auto;
  min-width: 100px;
}
`
