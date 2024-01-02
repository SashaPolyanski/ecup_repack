export const getError = (data: object) => {
  return Object.values(data).flat().join("");
};
