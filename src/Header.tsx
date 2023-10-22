import { Button, Typography, theme } from "antd";
import React from "react";

const Header: React.FC = () => {
  const { token } = theme.useToken();

  const headerStyle: React.CSSProperties = {
    backgroundColor: token.colorPrimary,
    height: "3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 2rem",
  };

  return (
    <div style={headerStyle}>
      <Typography.Title style={{ color: "white", margin: 0 }} level={3}>
        Caesar Cipher
      </Typography.Title>
      <Button type="primary">Dark Mode</Button>
    </div>
  );
};

export default Header;
