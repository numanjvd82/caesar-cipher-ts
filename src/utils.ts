import { Settings } from "./pages/CaesarCipher";
import { VignereSettings } from "./pages/VignereCipher";

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

export function vigenereEncrypt(
  plaintext: string,
  key: string,
  settings: VignereSettings
) {
  let ciphertext = "";
  const keyRepeated = repeatKeyToMatchLength(key, plaintext.length);
  const { includeSymbols, includeNumbers } = settings;

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    if (isAlphabetic(char)) {
      const shift = getShift(keyRepeated[i]);
      const encryptedChar = shiftAlphabeticChar(char, shift);
      ciphertext += encryptedChar;
    } else if (isNumeric(char) && includeNumbers) {
      const shift = getShift(keyRepeated[i]);
      const encryptedChar = shiftNumericChar(char, shift);
      ciphertext += encryptedChar;
    } else if (isSymbol(char) && includeSymbols) {
      const shift = getShift(keyRepeated[i]);
      const encryptedChar = shiftSymbolChar(char, shift);
      ciphertext += encryptedChar;
    } else {
      ciphertext += char;
    }
  }

  return ciphertext;
}

export function vigenereDecrypt(
  ciphertext: string,
  key: string,
  settings: VignereSettings
) {
  let plaintext = "";
  const keyRepeated = repeatKeyToMatchLength(key, ciphertext.length);
  const { includeNumbers, includeSymbols } = settings;

  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    if (isAlphabetic(char)) {
      const shift = getShift(keyRepeated[i]);
      const decryptedChar = shiftAlphabeticChar(char, -shift);
      plaintext += decryptedChar;
    } else if (isNumeric(char) && includeNumbers) {
      const shift = getShift(keyRepeated[i]);
      const decryptedChar = shiftNumericChar(char, -shift);
      plaintext += decryptedChar;
    } else if (isSymbol(char) && includeSymbols) {
      const shift = getShift(keyRepeated[i]);
      const decryptedChar = shiftSymbolChar(char, -shift);
      plaintext += decryptedChar;
    } else {
      plaintext += char;
    }
  }

  return plaintext;
}

export function autokeyEncrypt(plaintext: string, key: string): string {
  let ciphertext: string = "";
  key = extendKey(key, plaintext.length);

  for (let i = 0; i < plaintext.length; i++) {
    const plaintextChar = plaintext[i];
    const keyChar = key[i];

    if (!isAlphabetic(plaintextChar)) {
      ciphertext += plaintextChar;
      key += plaintextChar;
      continue;
    }

    const ciphertextChar = encryptChar(plaintextChar, keyChar);
    ciphertext += ciphertextChar;

    key += plaintextChar; // Renew the key with the newly added plaintext character
  }

  return ciphertext;
}

function extendKey(key: string, length: number): string {
  while (key.length < length) {
    key += key[key.length % key.length];
  }

  return key;
}

function encryptChar(plainChar: string, keyChar: string): string {
  const alphabetSize: number = 26;

  // Convert keyChar to uppercase if it is a letter
  const shiftBase: number = keyChar.match(/[A-Za-z]/) ? "A".charCodeAt(0) : 0;
  const shift: number =
    (keyChar.toUpperCase().charCodeAt(0) - shiftBase) % alphabetSize;

  const encryptedChar: string = String.fromCharCode(
    ((plainChar.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + shift) %
      alphabetSize) +
      "A".charCodeAt(0)
  );

  // Preserve the original case
  return plainChar === plainChar.toLowerCase()
    ? encryptedChar.toLowerCase()
    : encryptedChar;
}

export function autokeyDecrypt(ciphertext: string, key: string): string {
  let plaintext: string = "";
  key = extendKey(key, ciphertext.length);

  for (let i = 0; i < ciphertext.length; i++) {
    const ciphertextChar = ciphertext[i];
    const keyChar = key[i];

    if (!isAlphabetic(ciphertextChar)) {
      plaintext += ciphertextChar;
      key += ciphertextChar;
      continue;
    }

    const plaintextChar = decryptChar(ciphertextChar, keyChar);
    plaintext += plaintextChar;

    key += ciphertextChar;
  }

  return plaintext;
}

function decryptChar(cipherChar: string, keyChar: string): string {
  const alphabetSize: number = 26;

  // Convert keyChar to uppercase if it is a letter
  const shiftBase: number = keyChar.match(/[A-Za-z]/) ? "A".charCodeAt(0) : 0;
  const shift: number =
    (keyChar.toUpperCase().charCodeAt(0) - shiftBase) % alphabetSize;

  const decryptedChar: string = String.fromCharCode(
    ((cipherChar.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) - shift + 26) %
      alphabetSize) +
      "A".charCodeAt(0)
  );

  // Preserve the original case
  return cipherChar === cipherChar.toLowerCase()
    ? decryptedChar.toLowerCase()
    : decryptedChar;
}

function repeatKeyToMatchLength(key: string, length: number) {
  const repeatedKey = key
    .repeat(Math.ceil(length / key.length))
    .slice(0, length);
  return repeatedKey;
}

function isAlphabetic(char: string) {
  return /[a-zA-Z]/.test(char);
}

function isNumeric(char: string) {
  return /[0-9]/.test(char);
}

function isSymbol(char: string) {
  return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(char);
}

function getShift(char: string) {
  return char.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
}

function shiftAlphabeticChar(char: string, shift: number) {
  const base = char === char.toUpperCase() ? "A" : "a";
  const shiftedChar = String.fromCharCode(
    ((char.charCodeAt(0) - base.charCodeAt(0) + shift + 26) % 26) +
      base.charCodeAt(0)
  );
  return shiftedChar;
}

function shiftNumericChar(char: string, shift: number) {
  const base = "0";
  const shiftedChar = String.fromCharCode(
    ((char.charCodeAt(0) - base.charCodeAt(0) + shift + 10) % 10) +
      base.charCodeAt(0)
  );
  return shiftedChar;
}

function shiftSymbolChar(char: string, shift: number) {
  const symbols = "!@#$%^&*()_+{}[]:;<>,.?~/-";
  const index =
    (symbols.indexOf(char) + shift + symbols.length) % symbols.length;
  return symbols[index];
}
