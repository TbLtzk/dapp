import React, { useEffect, useState } from 'react';
import ModalWindow from 'components/Base/ModalWindow';
import Themes from 'components/Base/Themes';
import DashboardModeButton from 'components/Base/DashboardMode/DashboarModeButton';

import { WrpVersion } from './styles';

function Settings() {
  const [modalShow, setModalShow] = useState(false);

  useEffect(async () => {

  }, []);

  return (
    <>
      <WrpVersion onClick={() => {
        setModalShow(true);
      }}>
        <i className={`mdi mdi-cog btn-icon`}/>
      </WrpVersion>
      <ModalWindow
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        modalTitle={'Settings'}
        content={
          <>
            <div className="modal-line" />
            <h3>Theme</h3>
            <Themes />
            <div className="modal-line" />
            <h3>Mode</h3>
            <DashboardModeButton />

          </>
        }
      />
    </>
  );
}

export default Settings;
