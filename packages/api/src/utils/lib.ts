// Generate random number (# of digits is customizable)
export const generatedNumber = (n = 10) => {
  let multiplier = Math.pow(10, n - 1)
  return Math.floor(1 * multiplier + Math.random() * 9 * multiplier);
}
