import React, {useState} from "react";
import {Row, Col} from "react-bootstrap";

import TabsView from "components/Base/TabsView";
import ModalWindow from "components/Base/ModalWindow";
import Button from "components/Base/Button";
import RootNodePanel from "components/Custom/RootNodePanel";

function QGovernance() {
    // const [modalShow, setModalShow] = useState(false);

    return (
        <Row>
            <Col xs={12}>
                <TabsView
                    dashboardContent={<RootNodePanel />}

                />
                {/*<Button*/}
                {/*    title="Launch"*/}
                {/*    handleButton={() => setModalShow(true)}*/}
                {/*/>*/}
                {/*<ModalWindow*/}
                {/*    show={modalShow}*/}
                {/*    onHide={() => setModalShow(false)}*/}
                {/*    continueBtnTitle={"Confirm"}*/}
                {/*    content={*/}
                {/*        <>*/}
                {/*            <h4>Modal</h4>*/}
                {/*            <p>*/}
                {/*                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,*/}
                {/*                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac*/}
                {/*                consectetur ac, vestibulum at eros.*/}
                {/*            </p>*/}

                {/*        </>*/}
                {/*    }*/}
                {/*/>*/}
            </Col>
        </Row>
    );
}

export default QGovernance;

