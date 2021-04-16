import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from "components/Base/Buttons/Button";

import { WrapBtnBlock, ButtonCustom, BtnLabel } from './styles';

function CreateQBtn(props) {
  const { activeTabTitle, onCreate } = props;

  return (
    <>
      <WrapBtnBlock>
        <Button
          width="200px"
          type={'transparent'}
          handleButton={onCreate}
          title={`+ Create ${activeTabTitle}`}
        />
      </WrapBtnBlock>
    </>

  );
}

export default CreateQBtn;

