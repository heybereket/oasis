// Generate a random number (digits customizable)
export const generatedNumber = (n = 10) => {
  let multiplier = Math.pow(10, n - 1);
  return Math.floor(1 * multiplier + Math.random() * 9 * multiplier);
};

// Search a JSON Object
export const searchJSON = (json: any[], key: string | symbol, value: any) => {
  // If index is -1 (not found), return false, else return true 
  return json.findIndex((data) => data[key] === value) !== -1;
};
