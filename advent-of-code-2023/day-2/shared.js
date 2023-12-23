export const testGameData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

export const elfGivenTotals = {
  red: 12,
  green: 13,
  blue: 14,
};

export const colorOptions = ["red", "green", "blue"];

/**
 * @returns {
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
export function buildParsedGameData(unparsedData) {
  const gameDataByLine = unparsedData.split("\n");
  const parsed = gameDataByLine.reduce((acc, gameLine, i) => {
    let game = {};
    const gameIndexAndDrawingResults = gameLine.split(":");
    game[gameIndexAndDrawingResults[0]] = {
      drawings: [],
      index: i + 1,
      isPossible: false,
    };
    // We don't know how many of these drawings there would be
    const drawingResults = gameIndexAndDrawingResults[1].split(";");
    drawingResults.forEach((drawing) => {
      let parsedDrawingData = {};
      const trimmedResult = drawing.trim();
      const colorResultStrings = trimmedResult.split(", ");
      colorResultStrings.forEach((colorResult) => {
        const totalAndColor = colorResult.split(" ");
        parsedDrawingData[totalAndColor[1]] = totalAndColor[0];
      });
      game[gameIndexAndDrawingResults[0]].drawings.push(parsedDrawingData);
    });
    return { ...acc, ...game };
  }, {});
  return parsed;
}
