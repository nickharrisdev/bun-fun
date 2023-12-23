import { separateLines } from "../input/calibration-document.js";

function getNumbersFromString(sourceStr) {
  let numbersInString = [];

  for (const char of sourceStr) {
    const numberizedChar = Number(char);
    if (typeof numberizedChar === "number" && !isNaN(numberizedChar)) {
      numbersInString.push(numberizedChar);
    }
  }

  return numbersInString;
}

export function concatTwoNumsAndConvertBackToNum(x, y) {
  return Number(`${x}${y}`) || 0;
}

export function getSumOfCalibrationValues() {
  let concatenatedNumFromEachLine = [];

  separateLines.forEach((line) => {
    const numbersInLine = getNumbersFromString(line);
    const firstNum = numbersInLine[0];
    const lastNum = numbersInLine.pop();
    const combinedAndConcatedFirstAndLastNums =
      concatTwoNumsAndConvertBackToNum(firstNum, lastNum);
    concatenatedNumFromEachLine.push(combinedAndConcatedFirstAndLastNums);
  });

  const sumOfAll = concatenatedNumFromEachLine.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return sumOfAll;
}
