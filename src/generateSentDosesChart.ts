import {
  groupVaccinesAmountByMonth,
  parseSentDosesExcelFile,
} from "./models/dao/SentDosesDAO";
import { getChartData } from "./utils/sentDosesUtils";
import { generateChart } from "./utils/chartUtils";
import { VaccinesGroupByMonth } from "./models/types/SentDoses";

const generateSentDosesChart = () => {
  const sentDoses = parseSentDosesExcelFile();

  const [sentDosesByMonth, monthsGroup, vaccines] =
    groupVaccinesAmountByMonth(sentDoses);

  const sentDosesChartData = getChartData({
    sentDosesByMonth: sentDosesByMonth as VaccinesGroupByMonth,
    monthsGroup: monthsGroup as string[],
    vaccines: vaccines as string[],
  });

  generateChart({
    data: sentDosesChartData,
    type: "line",
    chartFilename: "sent_doses_chart",
    titleChart: "Vacinas Enviadas para Aquidauana-ms por mês",
    size: {
      height: 1200,
      width: 1200,
    },
  });
};

export default generateSentDosesChart;
