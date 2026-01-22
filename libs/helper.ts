// 20) /libs/helpers.ts
export const formatDate = (iso?: string) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
};
