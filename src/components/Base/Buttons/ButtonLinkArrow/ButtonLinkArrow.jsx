import React from 'react';
import { useHistory } from 'react-router-dom';

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
          <i className="mdi mdi-arrow-right" />
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
