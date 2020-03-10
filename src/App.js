import React, { useState } from "react";
import Header from "./components/Header";
import Plateau from "./components/Plateau";
import CommandConsole from "./components/CommandConsole";
import Rover from "./components/Rover";
import "./App.css";

function App() {
  const [size, setSize] = useState({});
  const [rovers, setRovers] = useState([]);

  const commandHandler = command => {
    let parts = command.split(" ");
    if (parts.length === 3) {
      setRovers([
        ...rovers,
        new Rover({
          x: parseInt(parts[0], 10),
          y: parseInt(parts[1], 10),
          direction: parts[2]
        })
      ]);
    }
    if (parts.length === 2) {
      setSize({ width: parts[0], height: parts[1] });
      setRovers([]);
    }
    if (parts.length === 1) {
      let updatedRover = rovers[rovers.length - 1].processCommands(parts[0]);

      setRovers([...rovers.slice(0, rovers.length - 1), updatedRover]);
      return updatedRover.getCurrentStatus().currentPosition;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="simulator">
        <div className="commands-wrapper">
          <CommandConsole commandHandler={commandHandler}></CommandConsole>
        </div>
        <div className="plateau-wrapper">
          {size.width && <Plateau size={size} rovers={rovers}></Plateau>}
        </div>
      </div>
    </div>
  );
}

export default App;
