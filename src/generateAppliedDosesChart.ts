import {
  calcDosesBySocialGroup,
  convertAppliedDosesGroupedToPercentage,
  parseAppliedDosesExcelFile,
} from "./models/dao/AppliedDosesDAO";
import { getChartData } from "./utils/appliedDosesUtils";
import { generateChart } from "./utils/chartUtils";

const generateAppliedDosesChart = () => {
  const appliedDoses = parseAppliedDosesExcelFile();

  const appliedDosesByGroup = calcDosesBySocialGroup(appliedDoses);

  const appliedDosesByGroupPercentage =
    convertAppliedDosesGroupedToPercentage(appliedDosesByGroup);

  const appliedDosesChartData = getChartData(appliedDosesByGroupPercentage);

  generateChart({
    data: appliedDosesChartData,
    type: "pie",
    chartFilename: "applied_doses_chart",
    titleChart: "Doses Aplicadas em Aquidauana-ms (%)",
    size: {
      height: 1200,
      width: 1200,
    },
  });
};

export default generateAppliedDosesChart;
