import React, {useState} from "react";
import PropTypes from 'prop-types';

import {Tabs, Tab} from "react-bootstrap";

import {TabsStyle, TabStyle} from "./styles";

function TabsView(props) {
    const {show, onClose, content, type, header, dashboardContent} = props;
    const [key, setKey] = useState('dashboard');

    return (
        <TabsStyle
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <TabStyle eventKey="dashboard" title="Dashboard">
                {dashboardContent}
            </TabStyle>
            <TabStyle eventKey="manage" title="Manage">
                <p>Manage content</p>
            </TabStyle>
        </TabsStyle>
    );
}

TabsView.propTypes = {
    type: PropTypes.string,
    show: PropTypes.bool,
    content: PropTypes.string,
    header: PropTypes.string,
    onClose: PropTypes.func,
};

export default TabsView;

