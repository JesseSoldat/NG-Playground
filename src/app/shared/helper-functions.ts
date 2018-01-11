export function cleanStringSort(string) {
  let cleaned = this.cleanString(string);
  return cleaned
          .split('')
          .sort()
          .join('');
}

export function cleanString(string) {
  return string
    //take out spaces and symbols | leaves letters and numbers
    .replace(/[^\w]/g, '')
    .toLowerCase()
}

export function logger(result) {
  console.log(result);
}

export function buildCharMap(str) {
  const charMap = {};
  for (let char of cleanString(str)) {
    charMap[char] = charMap[char] + 1 || 1;
  }
  return charMap;
}