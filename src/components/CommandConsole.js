import React, { useState } from "react";
import "./CommandConsole.css";

const CommandConsole = props => {
  const [command, setCommand] = useState("");
  const [commandsLog, setCommandsLog] = useState([]);
  const [error, setError] = useState(null);

  const appendToLog = logEntry => {
    return previousState => {
      return [...previousState, logEntry];
    };
  };

  const commandSender = async () => {
    let valid = /^\d+\s+\d+$|^\d+\s+\d+\s[NEWS]$|^[LRM]+$/.test(command);
    if (!valid) {
      setError({ errorMessage: `Invalid Input.` });
      return;
    }
    setError(null);
    setCommandsLog(appendToLog(command));
    let response = await props.commandHandler(command.trim());
    if (response)
      setCommandsLog(
        appendToLog(
          `Current Position =>   ${response.x} ${response.y} ${response.direction}`
        )
      );
    setCommand("");
  };

  const CommandsHistory = ({ commandsLog }) => {
    return (
      <>
        {commandsLog.length > 0 && <h3>Commands:</h3>}
        <ul>
          {commandsLog.map((command, index) => {
            return (
              <li key={index}>
                <code>{command}</code>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <h2>Input Commands Console</h2>
      <div className="command-sender">
        <input
          name="command"
          type="text"
          className="command-textbox"
          value={command}
          onChange={e => setCommand(e.target.value.toUpperCase())}
        ></input>
        <button onClick={() => commandSender()}>Send</button>
        {error && (
          <div>
            <span className="errorMessage">{error.errorMessage}</span>
          </div>
        )}
        <CommandsHistory commandsLog={commandsLog} />
      </div>
    </>
  );
};

export default CommandConsole;
