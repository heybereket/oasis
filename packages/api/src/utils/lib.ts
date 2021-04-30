// Generate a random number (digits customizable)
export const generatedNumber = (n = 10) => {
  let multiplier = Math.pow(10, n - 1);
  return Math.floor(1 * multiplier + Math.random() * 9 * multiplier);
};

// Search a JSON Object
export const searchJSON = (json, value) => {
  return json.filter(
    function(data) {
      return data.login == value
    }
  );
}
