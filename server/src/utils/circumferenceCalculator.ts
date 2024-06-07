// Calculate the circumference of any given radius
export const calculateCircumference = (pi: string, radius: number): string => {
  const reducePi = pi.replace(".", "");
  const decimalLength = pi.substring(2).length;
  const circ = 2n * BigInt(reducePi) * BigInt(radius);
  const circRoundNum = circ
    .toString()
    .substring(0, circ.toString().length - decimalLength);
  const circDecNum = circ
    .toString()
    .substring(circ.toString().length - decimalLength);
  if (circDecNum.length === 0) {
    return circRoundNum;
  }
  return circRoundNum + "." + circDecNum;
};
