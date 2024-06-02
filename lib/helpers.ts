export function getCookie(cookieName: string) {
  // Split the document.cookie string into individual cookies
  var cookies = document.cookie.split(";");

  // Iterate over the cookies
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    // Trim any leading or trailing spaces
    cookie = cookie.trim();

    // Check if this cookie is the one we're looking for
    if (cookie.indexOf(cookieName + "=") === 0) {
      // If found, return the value of the cookie
      return cookie.substring(cookieName.length + 1);
    }
  }

  // If the cookie is not found, return null or an empty string
  return null;
}

export function removeCookie(cookieName: string) {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
// Function to validate image source
export function isValidImageSrc(src: string) {
  return (
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  );
}

export const crypt = (salt: string, text: string): string => {
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: number): string =>
    ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: number): number =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map((char) => char.charCodeAt(0))
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (salt: string, encoded: string): string => {
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: number): number =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return encoded
    .match(/.{1,2}/g)!
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
