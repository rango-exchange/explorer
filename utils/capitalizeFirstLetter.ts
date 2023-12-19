export const CapitalizeFirstLetter = (str: string): string => {
  if (str && str.length > 1) {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
  }
  return str;
};
