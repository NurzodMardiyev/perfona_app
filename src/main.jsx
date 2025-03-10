import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ContextApiProvider from "./context/contextApi.jsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ContextApiProvider>
        <App />
      </ContextApiProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);
