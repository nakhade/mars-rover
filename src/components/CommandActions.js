const leftSpin = {
  N: "W",
  E: "N",
  S: "E",
  W: "S"
};

const rightSpin = {
  N: "E",
  E: "S",
  S: "W",
  W: "N"
};

const moveForward = {
  N: position => ({ y: position.y + 1 }),
  E: position => ({ x: position.x + 1 }),
  S: position => ({ y: position.y - 1 }),
  W: position => ({ x: position.x - 1 })
};

const CommandActions = {
  L: position => ({ ...position, direction: leftSpin[position.direction] }),
  R: position => ({ ...position, direction: rightSpin[position.direction] }),
  M: position => ({
    ...position,
    ...moveForward[position.direction](position)
  })
};

export default CommandActions;
