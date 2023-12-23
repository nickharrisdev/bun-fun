/**
 * The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
 *
 * Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
 */

import { givenGameData } from "../input/game-data.js";
import { buildParsedGameData, colorOptions, elfGivenTotals } from "./shared.js";

function getTotalBlocksDrawn(drawingData) {
  return colorOptions.reduce((acc, color) => {
    acc = (drawingData[color] || 0) + acc;
  }, 0);
}

function getSumIndexesOfPossibleGames(parsedGameData, givenColorTotals) {
  let runningTotalOfIndexes = 0;
  const totalGivenBlocksDrawn = getTotalBlocksDrawn(givenColorTotals);

  Object.keys(parsedGameData).forEach((gameKey) => {
    let isPossible = true;
    parsedGameData[gameKey].drawings.forEach((drawing) => {
      const totalBlocks = getTotalBlocksDrawn(drawing);
      if (totalBlocks > totalGivenBlocksDrawn) {
        isPossible = false;
      }
      colorOptions.forEach((color) => {
        if (drawing[color] > givenColorTotals[color]) {
          isPossible = false;
        }
      });
    });
    if (isPossible) {
      runningTotalOfIndexes =
        runningTotalOfIndexes + parsedGameData[gameKey].index;
    }
  });
  return runningTotalOfIndexes;
}

export function cubeConundrumPt1(
  gameData = givenGameData,
  hypotheticalColorTotals = elfGivenTotals
) {
  // first need to parse the input into something easier to manipulate
  const parsedGameData = buildParsedGameData(gameData);
  const sumOfIndexesOfPossibleGames = getSumIndexesOfPossibleGames(
    parsedGameData,
    hypotheticalColorTotals
  );
  return sumOfIndexesOfPossibleGames;
}
