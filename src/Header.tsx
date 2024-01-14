import { Dropdown, MenuProps, Typography, theme } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { token } = theme.useToken();
  const location = useLocation();

  const headerStyle: React.CSSProperties = {
    backgroundColor: token.colorPrimary,
    height: "3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to="/">
          <h3>Caesar Cipher</h3>
        </Link>
      ),
      disabled: location.pathname === "/",
    },
    {
      key: "2",
      label: (
        <Link to="/vigenere-cipher">
          <h3>Vigenere Cipher</h3>
        </Link>
      ),
      disabled: location.pathname === "/vigenere-cipher",
    },
    {
      key: "3",
      label: (
        <Link to="/autokey-cipher">
          <h3>Autokey Cipher</h3>
        </Link>
      ),
      disabled: location.pathname === "/autokey-cipher",
    },
  ];

  return (
    <div style={headerStyle}>
      <Link to="/">
        <Typography.Title style={{ color: "white", margin: 0 }} level={3}>
          Multi Cipher Framework
        </Typography.Title>
      </Link>
      <Dropdown menu={{ items }}>
        <Typography.Title
          style={{ color: "white", margin: 0, cursor: "pointer" }}
          level={5}
        >
          Ciphers
        </Typography.Title>
      </Dropdown>
    </div>
  );
};

export default Header;
