import React from 'react';
import { useHistory } from 'react-router-dom';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import ButtonLink from 'components/Base/Buttons/ButtonLink';

import { WrapTitle } from './styles';

export default function ButtonLinkArrow ({ title, path, stateHistory, alwaysEnabled }) {
  const history = useHistory();

  return (
    <ButtonLink
      alwaysEnabled
      title={
        <>
          <WrapTitle>{title}</WrapTitle>
          <FontAwesomeIcon icon={faArrowRight} />
        </>
      }
      handleLink={() =>
        history.push({
          pathname: path,
          state: stateHistory
        })
      }
    />
  );
}

ButtonLinkArrow.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
