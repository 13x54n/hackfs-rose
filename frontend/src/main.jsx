import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThirdwebProvider } from "thirdweb/react";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import FilesProvider from "./contexts/Files.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider>
    <FilesProvider>
      <App />
    </FilesProvider>
    <ToastContainer />
  </ThirdwebProvider>
);
