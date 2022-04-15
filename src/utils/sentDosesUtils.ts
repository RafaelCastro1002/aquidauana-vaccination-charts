import { VaccinesGroupByMonth } from "../models/types/SentDoses";
import { GenerateChartParams } from "./chartUtils";
import { generateRandomColorsHexDecimal } from "./colorsUtils";

type GetChartDataParams = {
  sentDosesByMonth: VaccinesGroupByMonth;
  monthsGroup: string[];
  vaccines: string[];
};

export const getChartData = ({
  sentDosesByMonth,
  monthsGroup,
  vaccines,
}: GetChartDataParams) => {
  const datasets: GenerateChartParams["data"]["datasets"] = [];

  let index = 0;

  vaccines.forEach((vaccine) => {
    const color = generateRandomColorsHexDecimal();

    datasets.push({
      label: vaccine,
      borderColor: color,
      backgroundColor: color,
      data: [],
    });

    monthsGroup.forEach((monthGroup) => {
      const value = sentDosesByMonth[monthGroup][vaccine] || 0;
      datasets[index].data.push(value);
    });

    index++;
  });

  const chartData = {
    labels: monthsGroup,
    datasets,
  };

  return chartData;
};
