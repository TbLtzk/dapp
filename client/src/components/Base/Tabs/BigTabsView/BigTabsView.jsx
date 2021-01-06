import React, {useState} from "react";
import PropTypes from 'prop-types';

import {TabsStyle, TabStyle} from "./styles";

function BigTabsView(props) {
    const {tabsItems} = props;
    const [key, setKey] = useState(tabsItems[0]?.label);
    console.log("key", key);

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

BigTabsView.propTypes = {
    tabsItems: PropTypes.array,
};

export default BigTabsView;

