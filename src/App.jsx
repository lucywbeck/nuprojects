import { useState } from "react";
import logo from "./logo.svg";
import Routes from "./Routes";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </UserProvider>
  );
};

export default App;
