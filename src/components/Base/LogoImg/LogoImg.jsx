import React from "react";

import logo from "assets/img/logo.png";

function LogoImg() {
    return (
        <img
          style={{ filter: 'brightness(10)' }}
          alt="logo"
          src={logo}
          className="d-inline-block align-top"
        />
    );
}

export default LogoImg;

