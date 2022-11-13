import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/v1/products");
    const { message } = await response.json();
    setMessage(message);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
