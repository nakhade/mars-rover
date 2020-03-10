import React from "react";
import { render } from "@testing-library/react";
import Plateau, { TraversedTile } from "./Plateau";
import Rover from "./Rover";
import TestRenderer from "react-test-renderer";

describe("When upper-right coordinates of the Plateau are passed", () => {
  it("should render Plateau Component and title proprty should be updated with upper-right coordinates", () => {
    let size = { width: 4, height: 5 };
    let rovers = [];
    const { getByText } = render(<Plateau size={size} rovers={rovers} />);
    const title = getByText(/Plateau \(4, 5\)/i);
    expect(title).toBeInTheDocument();
  });
});

describe("When upper-right coordinates of the Plateau are passed", () => {
  it("should render Plateau Component as rectangle composed of tiles", async () => {
    let size = { width: 4, height: 5 };
    let rovers = [];
    const { findAllByRole } = render(<Plateau size={size} rovers={rovers} />);

    const tiles = await findAllByRole("cell");
    const rows = await findAllByRole("row");

    for (let row of rows) {
      expect(row.childNodes.length).toBe(4 + 1);
    }

    expect(tiles.length).toBe(30);
    expect(rows.length).toBe(5 + 1);
  });
});

test("renders Rover on Plateau", async () => {
  let size = { width: 4, height: 5 };
  let position = { x: 1, y: 2, direction: "N" };
  let rovers = [new Rover(position)];

  const testRenderer = TestRenderer.create(
    <Plateau size={size} rovers={rovers} />
  );
  const testInstance = testRenderer.root;

  expect(testInstance.findAllByType(TraversedTile).length).toEqual(1);
  expect(testInstance.findByType(TraversedTile).props.position).toEqual(
    position
  );
  expect(
    testInstance.findByType(TraversedTile).props.isCurrentPosition
  ).toEqual(true);
});

test("renders Rover on Plateau with traversed path", async () => {
  let size = { width: 4, height: 5 };
  let position = { x: 1, y: 2, direction: "N" };
  let rover = new Rover(position);
  rover.processCommands("MM");

  let rovers = [rover];

  const testRenderer = TestRenderer.create(
    <Plateau size={size} rovers={rovers} />
  );
  const testInstance = testRenderer.root;

  expect(testInstance.findAllByType(TraversedTile).length).toEqual(3);
});
