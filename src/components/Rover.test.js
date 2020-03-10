import Rover from "./Rover";

test("Rover is created with starting position", () => {
  let startingPosition = { x: 1, y: 2, direction: "N" };
  const rover = new Rover(startingPosition);
  const status = rover.getCurrentStatus();
  expect(status.traversedPath.length).toEqual(1);
  expect(status.traversedPath).toEqual([startingPosition]);
  expect(status.currentPosition).toEqual(startingPosition);
});

describe("Rover when passed with series of commands", () => {
  test.each`
    currentPosition | command         | result
    ${[2, 2, "E"]}  | ${"L"}          | ${[2, 2, "N"]}
    ${[2, 2, "E"]}  | ${"ML"}         | ${[3, 2, "N"]}
    ${[1, 2, "N"]}  | ${"LMLMLMLMM"}  | ${[1, 3, "N"]}
    ${[3, 3, "E"]}  | ${"MMRMMRMRRM"} | ${[5, 1, "E"]}
  `(
    "should process the commands and update rover positions",
    ({ currentPosition, command, result }) => {
      let position = {
        x: currentPosition[0],
        y: currentPosition[1],
        direction: currentPosition[2]
      };
      let expected = { x: result[0], y: result[1], direction: result[2] };

      let rover = new Rover(position);
      rover.processCommands(command);

      let currentStatus = rover.getCurrentStatus();
      expect(currentStatus.currentPosition).toEqual(expected);
    }
  );
});
