interface GroupCount {
  total: number;
  byGroup: Record<string, number>;
}

export default interface CountsByYear {
  [year: string]: GroupCount;
}
