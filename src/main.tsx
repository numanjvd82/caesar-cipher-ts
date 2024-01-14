import { App as AntDApp, ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const RootComponent = () => {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4826de",
          },
          components: {
            Card: {
              lineWidth: 1,
            },
          },
        }}
      >
        <AntDApp>
          <App />
        </AntDApp>
      </ConfigProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<RootComponent />);
