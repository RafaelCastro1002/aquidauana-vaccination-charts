import { ChartConfiguration } from "chart.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { writeFileSync } from "fs";
import { join } from "path";

type GenerateChartParams = {
  data: {
    labels: string[];
    datasets: {
      borderColor: string[];
      backgroundColor: string[];
      data: number[];
    }[];
  };
  type: "line" | "pie";
  size?: {
    height: number;
    width: number;
  };
  chartFilename: string;
  titleChart: string;
};

export const generateChart = ({
  data,
  type,
  size = { height: 800, width: 800 },
  chartFilename,
  titleChart,
}: GenerateChartParams) => {
  const chart = new ChartJSNodeCanvas({
    height: size.height,
    width: size.width,
    backgroundColour: "white",
  });

  const configuration: ChartConfiguration = {
    data,
    type,
    options: {
      plugins: {
        title: {
          text: titleChart,
          display: true,
          font: {
            size: 30,
          },
          padding: {
            top: 10,
            bottom: 30,
          },
        },
      },
    },
  };
  const image = chart.renderToBufferSync(configuration);

  const fileName = `${chartFilename.replace(" ", "_")}.png`;
  const path = join(__dirname, "..", "charts", fileName);
  writeFileSync(path, image);
};
