import { Settings } from "./App";

export function encodeUsingCaesarCipher(plainText: string, settings: Settings) {
  let result = "";
  const { shift, includeSymbols, includeNumbers, includeUppercase } = settings;
  plainText.split("").forEach((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode >= 97 && charCode <= 122) {
      // Lowercase
      const newCharCode = ((charCode - 97 + shift) % 26) + 97;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 65 && charCode <= 90 && includeUppercase) {
      // Uppercase
      const newCharCode = ((charCode - 65 + shift) % 26) + 65;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 48 && charCode <= 57 && includeNumbers) {
      // Numbers
      const newCharCode = ((charCode - 48 + shift) % 10) + 48;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 33 && charCode <= 47 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 33 + shift) % 15) + 33;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 58 && charCode <= 64 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 58 + shift) % 7) + 58;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 91 && charCode <= 96 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 91 + shift) % 6) + 91;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 123 && charCode <= 126 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 123 + shift) % 4) + 123;
      result += String.fromCharCode(newCharCode);
    } else {
      result += char;
    }
  });

  return result;
}

export function decodeUsingCaesarCipher(
  cipherText: string,
  settings: Settings
) {
  let result = "";
  const { shift, includeSymbols, includeNumbers, includeUppercase } = settings;
  cipherText.split("").forEach((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode >= 97 && charCode <= 122) {
      // Lowercase
      const newCharCode = ((charCode - 97 - shift + 26) % 26) + 97;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 65 && charCode <= 90 && includeUppercase) {
      // Uppercase
      const newCharCode = ((charCode - 65 - shift + 26) % 26) + 65;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 48 && charCode <= 57 && includeNumbers) {
      // Numbers
      const newCharCode = ((charCode - 48 - shift + 10) % 10) + 48;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 33 && charCode <= 47 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 33 - shift + 15) % 15) + 33;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 58 && charCode <= 64 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 58 - shift + 7) % 7) + 58;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 91 && charCode <= 96 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 91 - shift + 6) % 6) + 91;
      result += String.fromCharCode(newCharCode);
    } else if (charCode >= 123 && charCode <= 126 && includeSymbols) {
      // Symbols
      const newCharCode = ((charCode - 123 - shift + 4) % 4) + 123;
      result += String.fromCharCode(newCharCode);
    } else {
      result += char;
    }
  });

  return result;
}
