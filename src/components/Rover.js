import commandActions from "./CommandActions";

class Rover {
  constructor(startPosition) {
    this.startPosition = startPosition;
    this.currentStatus = {
      currentPosition: startPosition,
      traversedPath: [startPosition]
    };
  }

  processCommands = commands => {
    for (let command of commands) {
      let nextPosition = commandActions[command](
        this.currentStatus.currentPosition
      );
      this.currentStatus.traversedPath.push(nextPosition);
      this.currentStatus.currentPosition = { ...nextPosition };
    }
    return this;
  };

  getCurrentStatus = () => {
    return this.currentStatus;
  };
}

export default Rover;
