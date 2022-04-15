type SentDoses = {
  date: string;
  city: string;
  vaccine: string;
  sentDoses: number;
};

export const columnToKeySentDoses: Record<string, keyof SentDoses> = {
  A: "date",
  B: "city",
  C: "vaccine",
  D: "sentDoses",
};

export type VaccinesGroupByMonth = Record<string, SentDoses[]>;

export default SentDoses;
