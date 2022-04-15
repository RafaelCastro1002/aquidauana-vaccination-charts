import { AppliedDosesBySocialGroup } from "../models/types/AppliedDoses";
import { generateRandomColorsHexDecimal } from "./colorsUtils";

export const getChartData = (appliedDoses: AppliedDosesBySocialGroup) => {
  const labels: string[] = [];
  const data: number[] = [];
  const backgroundColor: string[] = [];

  const entriesOnAppliedDoses = Object.entries(appliedDoses);

  entriesOnAppliedDoses.forEach(([key, value]) => {
    labels.push(`${key} (${value})`);
    data.push(value);
    backgroundColor.push(generateRandomColorsHexDecimal());
  });

  const chartData = {
    labels,
    datasets: [
      {
        borderColor: "#f1f1f1",
        backgroundColor,
        data,
      },
    ],
  };

  return chartData;
};
