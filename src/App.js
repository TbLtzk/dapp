import React from 'react';

import {Container} from "react-bootstrap";

import Routes from "./navigation/Routes";

function App() {
    return (
        <Container className="App" fluid>
            <Routes/>
        </Container>
    );
}

export default App;
