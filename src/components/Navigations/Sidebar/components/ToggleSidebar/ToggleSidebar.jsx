import FormSwitch from 'components/Base/Form/FormSwitch'
import React from 'react'

function ToggleSidebar ({ openSidebar, setOpenSidebar }) {
  function handleToggle () {
    if (openSidebar) {
      setOpenSidebar('')
      localStorage.setItem('sidebar-toggle', '0')
    } else {
      setOpenSidebar('0')
      localStorage.setItem('sidebar-toggle', '')
    }
  }

  return <FormSwitch onChange={handleToggle} id="sidebar-switcher" checked={!openSidebar} label="Hide sidebar" />
}

export default ToggleSidebar
