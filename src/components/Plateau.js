import React from "react";
import rocket from "./rover-icon.svg";
import "./Plateau.css";

const cssFacing = {
  N: "north-facing",
  S: "south-facing",
  E: "east-facing",
  W: "west-facing"
};

export const Tile = React.memo(props => {
  return (
    <div className="tile" role="cell">
      <span>
        {props.x}-{props.y}
      </span>
    </div>
  );
});

export const TraversedTile = props => {
  const { x, y, direction } = props.position;
  const css = cssFacing[direction];
  let cssCurrentPosition = props.isCurrentPosition ? "current-location" : "";
  return (
    <div className={`tile traversed ${cssCurrentPosition}`} role="cell">
      <img src={rocket} className={`rocket ${css}`} alt="rocket" />
      <span>
        {x}-{y}
      </span>
    </div>
  );
};

const Plateau = props => {
  const items = [];

  for (let columnIndex = props.size.height; columnIndex >= 0; columnIndex--) {
    let rowItems = [];
    for (let rowIndex = 0; rowIndex <= props.size.width; rowIndex++) {
      rowItems.push(<Tile key={rowIndex} x={rowIndex} y={columnIndex} />);
    }
    items.push(rowItems);
  }

  for (let rover of props.rovers) {
    let { currentPosition, traversedPath } = rover.getCurrentStatus();

    for (const traversedPosition of traversedPath) {
      let { x, y } = traversedPosition;
      let isCurrentPosition =
        currentPosition.x === x && currentPosition.y === y;
      items[props.size.height - y][x] = (
        <TraversedTile
          key={`${x}-${y}`}
          position={traversedPosition}
          isCurrentPosition={isCurrentPosition}
        />
      );
    }
  }

  return (
    <>
      <h1>{`Plateau (${props.size.width}, ${props.size.height})`}</h1>
      <div className="tile-container">
        {items.map((tiles, columnIndex) => (
          <div key={columnIndex} className="tile-row" role="row">
            {tiles}
          </div>
        ))}
      </div>
    </>
  );
};

export default Plateau;
