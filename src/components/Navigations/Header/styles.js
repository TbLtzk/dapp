import styled, { css } from 'styled-components'

const handleColorTheme = (props) => {
  switch (props.network) {
    case '35441': {
      return css`
        color: ${props.theme.colors.oxfordBlue};
        background: ${props.theme.colors.neonGreen};
      `
    }
    case '35442': {
      return css`
        color: ${props.theme.colors.white};
        background: ${props.theme.colors.red};
      `
    }
    case '35443': {
      return css`
        color: ${props.theme.colors.oxfordBlue};
        background: ${props.theme.colors.validationError};
      `
    }
  }
}

export const ElementsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 60px;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
  height: 70px;
`

export const WrapLogo = styled.div`
  margin-left: 40px;
  img {
    width: 53px;
  }
`

export const NetworkWrapper = styled.div`
  padding: 7px 11px;
  text-overflow: ellipsis;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 20px;
  font-size: 15px;
  line-height: 18px;
  border-radius: 3px;
  width: 150px;
  ${(props) => handleColorTheme(props)}
`
