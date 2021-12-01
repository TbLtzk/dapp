import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TabsStyle, TabStyle } from './styles'

function BigTabsView ({ tabsItems, active }) {
  const [key, setKey] = useState(() => active || tabsItems[0]?.label)

  function handleSetKey (k) {
    setKey(k)
  }

  return (
        <TabsStyle id="tabs" activeKey={key} onSelect={handleSetKey}>
            {!tabsItems
              ? null
              : tabsItems.map((tab, idx) => (
                      <TabStyle key={idx + tab.label} eventKey={tab.label} title={tab.title}>
                          {tab.content}
                      </TabStyle>
              ))}
        </TabsStyle>
  )
}

BigTabsView.propTypes = {
  tabsItems: PropTypes.array
}

export default BigTabsView
