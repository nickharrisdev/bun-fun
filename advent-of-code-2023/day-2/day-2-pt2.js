/**
 * in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
 *
 * power = red * blue * green
 *
 * for each game, find the minimum set of cubes that must of been present
 * return sum of the power of each set
 */

import { givenGameData } from "../input/game-data.js";
import { buildParsedGameData, colorOptions, testGameData } from "./shared.js";

function getPowerOfDrawingData(drawingData) {
  const total = colorOptions.reduce((acc, currentColor) => {
    let numberToMultiplyBy = drawingData[currentColor];
    if (numberToMultiplyBy === 0) numberToMultiplyBy = 1;
    return (acc = acc * numberToMultiplyBy);
  }, 1);
  return total;
}

function tryParseNumber(value) {
  const parsedValue = parseFloat(value);

  // Check if the parsed value is NaN (Not a Number)
  if (isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
}

/**
 * game -> {
 *  "Game 1": [{
 *    red: number,
 *    blue: number,
 *    green: number,
 *  }],
 * index: 1,
 * isPossible: false
 * ...
 * }
 */
function getMinimumSetOfCubesForAGivenGame(game) {
  let colorsToCounts = {
    red: [],
    green: [],
    blue: [],
  };
  game.drawings.forEach((drawing) => {
    colorOptions.forEach((color) => {
      colorsToCounts[color].push(tryParseNumber(drawing[color]));
    });
  });
  const colorsToMins = {
    red: Math.max(...colorsToCounts.red),
    green: Math.max(...colorsToCounts.green),
    blue: Math.max(...colorsToCounts.blue),
  };
  return colorsToMins;
}

export function cubeConundrumPt2(gameData = givenGameData) {
  const parsedGameData = buildParsedGameData(gameData);
  const minimumDrawings = Object.keys(parsedGameData).map((gameKey) => {
    return getMinimumSetOfCubesForAGivenGame(parsedGameData[gameKey]);
  });
  const minimumDrawingsPowers = minimumDrawings.map((drawingData) => {
    return getPowerOfDrawingData(drawingData);
  });
  return minimumDrawingsPowers.reduce((acc, curr) => acc + curr, 0);
}
