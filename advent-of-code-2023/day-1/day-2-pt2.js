import { concatTwoNumsAndConvertBackToNum } from "./day-1-pt1.js";
import { separateLines } from "../input/calibration-document.js";
// const testInput = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// `.split("\n");

const stringNumToNumber = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const stringNums = Object.keys(stringNumToNumber);
const nums = Object.values(stringNumToNumber);

function isNumber(x) {
  const convertedVal = Number(x);
  return typeof convertedVal === "number" && !isNaN(convertedVal);
}

function getAllInstancesOfAStringNumInALine(line, stringNumToFind) {
  let currentIndex = 0;
  let counterIndex = -1;
  let resultArray = [];
  while (currentIndex !== -1) {
    const indexOfStringNum = line.indexOf(stringNumToFind, counterIndex + 1);
    currentIndex = indexOfStringNum;
    counterIndex = indexOfStringNum;
    if (indexOfStringNum !== -1) {
      const result = {
        number: isNumber(stringNumToFind)
          ? Number(stringNumToFind)
          : stringNumToNumber[stringNumToFind],
        indexOfStringNum,
      };
      resultArray.push(result);
    }
  }
  return resultArray;
}

export function getSumOfCalibrationValuesFromStrings() {
  // go through each line
  // track all numbers in this array
  let numsToSum = [];
  separateLines.forEach((line, i) => {
    // {number: , indexOfStringNum: }[]
    let lineArrayOfStringNums = [];
    const lowerCaseLine = line.toLocaleLowerCase();

    [nums, stringNums].forEach((numGroup) => {
      numGroup.forEach((stringNum) => {
        const instancesOfNumInLine = getAllInstancesOfAStringNumInALine(
          lowerCaseLine,
          stringNum
        );
        lineArrayOfStringNums.push(...instancesOfNumInLine);
      });
    });
    lineArrayOfStringNums.sort(
      (a, b) => a.indexOfStringNum - b.indexOfStringNum
    );
    const firstNum = lineArrayOfStringNums[0]?.number || 0;
    const lastNum = lineArrayOfStringNums.pop()?.number || 0;
    const concatenatedFirstAndLast = concatTwoNumsAndConvertBackToNum(
      firstNum,
      lastNum
    );
    // then add to the outer outer array
    numsToSum.push(concatenatedFirstAndLast);
  });
  // reduce array here
  const sumOfAll = numsToSum.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return sumOfAll;
}
