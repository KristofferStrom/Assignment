export const getInputError = (
  value,
  {
    min = 1,
    minError = "För kort",
    max = 999,
    maxError = "För långt",
    digitsOnly = false,
    lettersOnly = false,
    minNumber = 0,
    minNumberError = `Värdet måste vara minst ${minNumber}`,
  } = {}
) => {
  if (typeof value === "number") {
    if (value < minNumber) {
      return minNumberError;
    }
    return null;
  }
  if (value.length < min) {
    return minError;
  } else if (value.length > max) {
    return maxError;
  } else if (digitsOnly && !/^\d+$/.test(value)) {
    return "Endast siffror är tillåtna";
  } else if (lettersOnly && !/^[a-zA-ZåäöÅÄÖ\s]+$/.test(value)) {
    return "Endast bokstäver är tillåtna";
  }

  return null;
};
