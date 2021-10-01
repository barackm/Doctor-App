function splitString(str) {
  const result = [];
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (result.length > 0) {
      result.push(result[counter] + '.' + str[i]);
      counter++;
    } else {
      result.push(str[i]);
    }
  }

  return result;
}

console.log(splitString('abcdebfkj'));
