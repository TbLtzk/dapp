import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TabsStyle, TabStyle } from './styles'

function BigTabsView (props) {
  const { tabsItems, active } = props
  const [key, setKey] = useState(() => active || tabsItems[0]?.label)

  return (
    <TabsStyle
      id="tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      {
        !tabsItems
          ? null
          : tabsItems.map((el, i) => {
            return (
              <TabStyle key={i} eventKey={el.label} title={el.title}>
                {el.content}
              </TabStyle>
            )
          })
      }
    </TabsStyle>
  )
}

BigTabsView.propTypes = {
  tabsItems: PropTypes.array
}

export default BigTabsView
