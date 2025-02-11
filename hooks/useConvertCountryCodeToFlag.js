export const useConvertCountryCodeToFlag = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  const flag = String.fromCodePoint(...codePoints);
  return { flag };
};
