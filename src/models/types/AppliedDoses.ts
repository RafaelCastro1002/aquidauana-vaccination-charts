type AppliedDoses = {
  date: string;
  city: string;
  vaccine: string;
  group: string;
  appliedDoses: number;
};

export const columnToKeyAppliedDoses: Record<string, keyof AppliedDoses> = {
  A: "date",
  B: "city",
  C: "vaccine",
  D: "group",
  E: "appliedDoses",
};

export type AppliedDosesBySocialGroup = Record<string, number>;

export default AppliedDoses;
