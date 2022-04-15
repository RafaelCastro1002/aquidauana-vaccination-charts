import { join } from "path";
import { getMonthAndYearFromDate } from "../../utils/dateUtils";
import { convertExcelToJson } from "../../utils/excelManageUtils";
import SentDoses, {
  columnToKeySentDoses,
  VaccinesGroupByMonth,
} from "../types/SentDoses";

export const parseSentDosesExcelFile = (): SentDoses[] => {
  const pathFile = join(__dirname, "..", "..", "data", "sent_doses.xlsx");

  const parsedContent = convertExcelToJson({
    pathFile,
    columnToKey: columnToKeySentDoses,
  });

  return parsedContent["Sheet1"];
};

export const groupVaccinesAmountByMonth = (
  sentDoses: SentDoses[]
): (VaccinesGroupByMonth | string[])[] => {
  let monthsGroup: string[] = [];
  let vaccines: string[] = [];

  const vaccinesGroupByMonth = sentDoses.reduce((acc, cur) => {
    const date = new Date(cur.date);

    const monthYear = getMonthAndYearFromDate(date);
    const currentVaccine = cur.vaccine;

    if (!monthsGroup.includes(monthYear)) monthsGroup.push(monthYear);

    if (!vaccines.includes(currentVaccine)) vaccines.push(currentVaccine);

    const otherVaccines = acc[monthYear] || {};

    const qtdToCurrentVaccine = otherVaccines[currentVaccine] || 0;

    return {
      ...acc,
      [monthYear]: {
        ...otherVaccines,
        [currentVaccine]: qtdToCurrentVaccine + cur.sentDoses,
      },
    };
  }, {});

  return [vaccinesGroupByMonth, monthsGroup, vaccines];
};

// export const calcDosesBySocialGroup = (
//   appliedDoses: AppliedDoses[]
// ): AppliedDosesBySocialGroup => {
//   return appliedDoses.reduce((acc, cur) => {
//     const currentGroupKey = cur.group;

//     const currentGroup = acc[currentGroupKey] || 0;

//     return {
//       ...acc,
//       [currentGroupKey]: currentGroup + cur.appliedDoses,
//     };
//   }, {});
// };

// const calcTotalDoses = (appliedDosesByGroup: AppliedDosesBySocialGroup) => {
//   const entries = Object.entries(appliedDosesByGroup);

//   let totalDoses = 0;

//   entries.forEach(([_key, value]) => (totalDoses += value));

//   return totalDoses;
// };

// export const convertAppliedDosesGroupedToPercentage = (
//   appliedDosesByGroup: AppliedDosesBySocialGroup
// ): AppliedDosesBySocialGroup => {
//   const totalDoses = calcTotalDoses(appliedDosesByGroup);

//   const entriesOnAppliedDoses = Object.entries(appliedDosesByGroup);

//   const appliedDosesPercentage = {};

//   entriesOnAppliedDoses.forEach(([key, value]) => {
//     const percentage = (value / totalDoses) * 100;
//     appliedDosesPercentage[key] = Number(percentage.toFixed(2));
//   });

//   return appliedDosesPercentage;
// };
