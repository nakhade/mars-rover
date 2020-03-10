import React from "react";
import logo from "../logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Mars Rover</p>
    </header>
  );
};

export default Header;
