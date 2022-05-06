import React from 'react';

import FormSwitch from 'components/Base/Form/FormSwitch';

function ToggleSidebar ({ openSidebar, setOpenSidebar }) {
  function handleToggle () {
    if (openSidebar) {
      setOpenSidebar('');
      localStorage.setItem('sidebar-toggle', '0');
    } else {
      setOpenSidebar('0');
      localStorage.setItem('sidebar-toggle', '');
    }
  }

  return <FormSwitch
    id="sidebar-switcher"
    checked={!openSidebar}
    label="Hide sidebar"
    onChange={handleToggle}
  />;
}

export default ToggleSidebar;
