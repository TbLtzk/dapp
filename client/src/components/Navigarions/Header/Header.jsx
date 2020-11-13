import React from "react";
import {Link} from "react-router-dom";

import {Container, Navbar, Nav} from "react-bootstrap";

import Button from "components/Base/Button"
import LogoImg from "components/Base/LogoImg"

import {navItems} from "./constants";

import {NavbarContainer, ListContainer, WrapBtn} from "./styles";

function Header() {

    return (
        <header>
            <NavbarContainer bg="light" expand="lg">
                <Container fluid>
                    <Link to={'/'} className="navbar-brand">
                       <LogoImg/>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <ListContainer id="basic-navbar-nav">
                        <Nav>

                            {
                                navItems.map((value, key) => {
                                    return (
                                        <Link to={'/' + value.location} key={key}
                                              className="nav-link">{value.label}</Link>
                                    );
                                })
                            }
                            <WrapBtn>
                                <Button
                                    title="Connect Wallet"
                                    handleButton={() => {
                                        console.log('click');
                                        window.ethereum.request({ method: 'eth_requestAccounts' });
                                    }}
                                />
                            </WrapBtn>
                        </Nav>
                    </ListContainer>
                </Container>
            </NavbarContainer>
        </header>

    );
}

export default Header;

