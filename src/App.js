import React from "react";
import ExportButton from "./components/ExportButton/ExportButton";
import LoginForm from "./components/LoginForm/LoginForm";

const App = () => {
  return (
    <div className="App">
      <h1>React Project Exporter</h1>
      <LoginForm />
      <div style={{ marginTop: 10 }}>
        <ExportButton />
      </div>
    </div>
  );
};

export default App;
