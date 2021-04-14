import React from 'react';
import PropTypes from 'prop-types';
import { Link } from './styles';

export default function ButtonLink(props) {
  const { title, width, handleLink } = props;

  return (
    <Link
      width={width}
      variant="default"
      onClick={handleLink}
    >
      {title}
    </Link>
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
