import React, {useState} from "react";
import PropTypes from 'prop-types';

import {TabsStyle, TabStyle} from "./styles";

function TabsView(props) {
    const {tabsItems} = props;
    const [key, setKey] = useState(tabsItems[0]?.label);

    return (
        <TabsStyle
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            {
                !tabsItems ? null :
                    tabsItems.map((el, i) => {
                        return (
                            <TabStyle key={i} eventKey={el.label} title={el.title}>
                                {el.content}
                            </TabStyle>
                        )

                    })
            }
        </TabsStyle>
    );
}

TabsView.propTypes = {
    tabsItems: PropTypes.array,
};

export default TabsView;

