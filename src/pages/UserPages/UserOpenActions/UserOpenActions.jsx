import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";

import {useDispatch, useSelector} from "react-redux";
import {getUserInf} from "store/actions/action-creaters/user-inf";
import {errorM, loadingUserInf, user} from "store/selectors/user-inf";

function UserOpenActions() {

    const userInf = useSelector(user);
    const loading = useSelector(loadingUserInf);
    const errorMessage = useSelector(errorM);

    console.log('userInf', userInf);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInf())
    }, []);

    return (
        <Row>
            <Col xs={12}>
                <h3>My Open Actions</h3>
                <p>
                    User id: {userInf?.id}
                </p>
            </Col>
        </Row>

    );
}

export default UserOpenActions;

