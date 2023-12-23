import { getSumOfCalibrationValues } from "./day-1/day-1-pt1.js";
import { getSumOfCalibrationValuesFromStrings } from "./day-1/day-2-pt2.js";
import { cubeConundrumPt1 } from "./day-2/day-2-pt1.js";
import { cubeConundrumPt2 } from "./day-2/day-2-pt2.js";
import { gearRatiosPt1 } from "./day-3/day-3-pt1.js";

interface ScriptAndSolution {
  script: () => number;
  correctAnswer: number | string;
}

const dayNumberToSolution: { [key: number | string]: ScriptAndSolution[] } = {
  1: [
    {
      script: getSumOfCalibrationValues,
      correctAnswer: 54561,
    },
    {
      script: getSumOfCalibrationValuesFromStrings,
      correctAnswer: 54076,
    },
  ],
  2: [
    { script: cubeConundrumPt1, correctAnswer: 2505 },
    { script: cubeConundrumPt2, correctAnswer: 70265 },
  ],
  3: [{ script: gearRatiosPt1, correctAnswer: "unknown" }],
};

const dayNumber = Number(process.argv[2]);

if (dayNumber) {
  // fixme
  // console.log(dayNumberToSolution[dayNumber]?.());
} else {
  const allDays = Object.keys(dayNumberToSolution);
  allDays.forEach((day: string) => {
    dayNumberToSolution[day].forEach((part, i) => {
      const computedAnswer = part?.script();
      const isCorrect = computedAnswer === part?.correctAnswer;
      console.log(
        `day ${day} pt${i + 1}:`,
        computedAnswer,
        "correct: ",
        isCorrect
      );
    });
  });
}