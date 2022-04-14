const excelToJson = require("convert-excel-to-json");

type ConvertExcelToJsonParams = {
  pathFile: string;
  header?: {
    rows: number;
  };
  columnToKey?: Record<string, string>;
};

export const convertExcelToJson = ({
  pathFile,
  header = { rows: 1 },
  columnToKey,
}: ConvertExcelToJsonParams) => {
  const result = excelToJson({
    sourceFile: pathFile,
    header,
    columnToKey,
  });

  return result;
};
