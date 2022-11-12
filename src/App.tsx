import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] =useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8080');
    const { message } = await response.json();
    setMessage(message);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      {loading ? "loading..." : message}
    </div>
  );
}

export default App;
