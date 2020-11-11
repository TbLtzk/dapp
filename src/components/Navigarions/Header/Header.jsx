import React from "react";
import {Link} from "react-router-dom";

import {Container, Navbar, Nav} from "react-bootstrap";

import Button from "components/Base/Button"

import {navItems} from "./constants";
import logo from "assets/img/logo.png";

import {NavbarContainer, ListContainer, WrapBtn} from "./styles";

function Header() {

    return (
        <header>
            <NavbarContainer bg="light" expand="lg">
                <Container fluid>
                    <Link to={'/'} className="navbar-brand">
                        <img
                            alt="logo"
                            src={logo}
                            className="d-inline-block align-top"
                        />
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
                                        console.log('click')
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

