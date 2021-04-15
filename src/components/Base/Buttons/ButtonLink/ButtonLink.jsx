import React from 'react';
import PropTypes from 'prop-types';
import Button from "components/Base/Buttons/Button";

export default function ButtonLink(props) {
  const { title, width, handleLink } = props;
  return (
    <Button
      title={title || ''}
      type={'transparent'}
      width={width}
      handleButton={handleLink}
    />
  );
}

ButtonLink.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  width: PropTypes.string,
  handleLink: PropTypes.func.isRequired,
};

ButtonLink.defaultProps = {
  width: 'auto',
};
