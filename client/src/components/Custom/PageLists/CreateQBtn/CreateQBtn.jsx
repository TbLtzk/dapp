import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { WrapBtnBlock, ButtonCustom, BtnLabel } from './styles';

function CreateQBtn(props) {
  const { activeTabTitle, onCreate } = props;

  return (
    <>
      <WrapBtnBlock>
        <ButtonCustom
          variant="primary"
          onClick={onCreate}
        >
          <FontAwesomeIcon icon={faPlus}/>
        </ButtonCustom>
        <BtnLabel>Create {activeTabTitle}</BtnLabel>
      </WrapBtnBlock>
    </>

  );
}

export default CreateQBtn;

