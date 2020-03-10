import CommandActions from "./CommandActions";

describe("CommandActions when passed with 'L' command", () => {
  it.each`
    facing | command | result
    ${"N"} | ${"L"}  | ${"W"}
    ${"S"} | ${"L"}  | ${"E"}
    ${"W"} | ${"L"}  | ${"S"}
    ${"E"} | ${"L"}  | ${"N"}
  `(
    "should change the direction $facing to $result only",
    ({ facing, command, result }) => {
      let position = { x: 1, y: 2, direction: facing };
      let expected = { x: 1, y: 2, direction: result };

      const newPosition = CommandActions[command](position);

      expect(newPosition).toEqual(expected);
    }
  );
});

describe("CommandActions when passed with 'R' command", () => {
  it.each`
    facing | command | result
    ${"N"} | ${"R"}  | ${"E"}
    ${"S"} | ${"R"}  | ${"W"}
    ${"W"} | ${"R"}  | ${"N"}
    ${"E"} | ${"R"}  | ${"S"}
  `(
    "should change the direction $facing to $result only",
    ({ facing, command, result }) => {
      let position = { x: 1, y: 2, direction: facing };
      let expected = { x: 1, y: 2, direction: result };

      const newPosition = CommandActions[command](position);

      expect(newPosition).toEqual(expected);
    }
  );
});

describe("CommandActions when passed with 'M' command", () => {
  it.each`
    propX | propY | propDirection | resultX | resultY | resultDirection
    ${1}  | ${2}  | ${"W"}        | ${0}    | ${2}    | ${"W"}
    ${1}  | ${2}  | ${"N"}        | ${1}    | ${3}    | ${"N"}
    ${1}  | ${2}  | ${"E"}        | ${2}    | ${2}    | ${"E"}
    ${1}  | ${2}  | ${"S"}        | ${1}    | ${1}    | ${"S"}
  `(
    "should move forward one grid point and maintain the same heading",
    ({ propX, propY, propDirection, resultX, resultY, resultDirection }) => {
      let position = { x: propX, y: propY, direction: propDirection };
      let expected = { x: resultX, y: resultY, direction: resultDirection };

      const newPosition = CommandActions["M"](position);

      expect(newPosition).toEqual(expected);
    }
  );
});
