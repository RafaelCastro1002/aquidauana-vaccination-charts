import { join } from "path";
import { convertExcelToJson } from "../../utils/excelManageUtils";
import AppliedDoses, {
  AppliedDosesBySocialGroup,
  columnToKeyAppliedDoses,
} from "../types/AppliedDoses";

export const parseAppliedDosesExcelFile = (): AppliedDoses[] => {
  const pathFile = join(__dirname, "..", "..", "data", "applied_doses.xlsx");

  const parsedContent = convertExcelToJson({
    pathFile,
    columnToKey: columnToKeyAppliedDoses,
  });

  return parsedContent["Sheet1"];
};

export const calcDosesBySocialGroup = (
  appliedDoses: AppliedDoses[]
): AppliedDosesBySocialGroup => {
  return appliedDoses.reduce((acc, cur) => {
    const currentGroupKey = cur.group;

    const currentGroup = acc[currentGroupKey] || 0;

    return {
      ...acc,
      [currentGroupKey]: currentGroup + cur.appliedDoses,
    };
  }, {});
};

const calcTotalDoses = (appliedDosesByGroup: AppliedDosesBySocialGroup) => {
  const entries = Object.entries(appliedDosesByGroup);

  let totalDoses = 0;

  entries.forEach(([_key, value]) => (totalDoses += value));

  return totalDoses;
};

export const convertAppliedDosesGroupedToPercentage = (
  appliedDosesByGroup: AppliedDosesBySocialGroup
): AppliedDosesBySocialGroup => {
  const totalDoses = calcTotalDoses(appliedDosesByGroup);

  const entriesOnAppliedDoses = Object.entries(appliedDosesByGroup);

  const appliedDosesPercentage = {};

  entriesOnAppliedDoses.forEach(([key, value]) => {
    const percentage = (value / totalDoses) * 100;
    appliedDosesPercentage[key] = Number(percentage.toFixed(2));
  });

  return appliedDosesPercentage;
};
