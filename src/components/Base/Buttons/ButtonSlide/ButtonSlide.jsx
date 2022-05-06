import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';

import FormInput from '../../Form/FormInput';

import { BtnSlide, ButtonSlideForm } from './styles';

import { errorHandler } from 'func/useful';

export default function ButtonSlide (props) {
  const { btnTxt, btnShortTxt, onclick, inpType, inpPlaceholder, inpRules, disabled, onChange } = props;
  const { register, handleSubmit, errors } = useForm();
  const [isClickedOnce, setIsClickedOnce] = useState(false);

  const clickBtn = (e) => {
    if (isClickedOnce === false) {
      e.preventDefault();
      setIsClickedOnce(true);
    }
  };

  return (
    <ButtonSlideForm onSubmit={handleSubmit(onclick)}>
      <FormInput
        ref={register(inpRules)}
        name="field"
        type={inpType}
        placeholder={inpPlaceholder}
        valid={errorHandler(errors, 'field')}
        disabled={disabled}
        onChange={onChange}
      />
      <BtnSlide
        type="submit"
        className={isClickedOnce ? 'enabled' : ''}
        onClick={clickBtn}
      >
        {isClickedOnce ? btnShortTxt : btnTxt}
      </BtnSlide>
    </ButtonSlideForm>
  );
}

ButtonSlide.propTypes = {
  btnTxt: PropTypes.string.isRequired,
  btnShortTxt: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired,
  inpType: PropTypes.string.isRequired,
  inpPlaceholder: PropTypes.string.isRequired,
  inpRules: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

ButtonSlide.defaultProps = {
  disabled: false
};
