import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { ButtonCustom } from './styles'
import { theme } from 'store/theme/selectors'

function Button ({
  title,
  type,
  position,
  right,
  top,
  margin,
  width,
  disabled,
  handleButton,
  icon,
  iconFontSize,
  isIconPositionRight,
  whiteSpace
}) {
  const currentTheme = useSelector(theme)

  return (
        <ButtonCustom
            palette={currentTheme}
            disabled={disabled}
            type={type}
            width={width}
            position={position}
            right={right}
            whiteSpace={whiteSpace}
            top={top}
            margin={margin}
            onClick={handleButton}
            title={icon === 'copy' ? null : title}
            iconfontsize={iconFontSize}
            isiconpositionright={isIconPositionRight ? '1' : ''}
        >
            {icon
              ? (
                  isIconPositionRight
                    ? (
                    <>
                        {title}
                        <i className={`mdi mdi-${icon} btn-icon`} />
                    </>
                      )
                    : (
                    <>
                        <i className={`mdi mdi-${icon} btn-icon`} />
                        {title}
                    </>
                      )
                )
              : (
                  title
                )}
        </ButtonCustom>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  handleButton: PropTypes.func.isRequired
}

Button.defaultProps = {
  type: 'main',
  width: '',
  disabled: false
}

export default Button
