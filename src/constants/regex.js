export const stringRegex = /^[äöüa-zA-Z0-9]+$/gm

export const unitRegex = /^[1-9]+[0-9]*$/

export const linkRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9äöü][äöüa-zA-Z0-9-_]+[äöüa-zA-Z0-9]\.[^\s]{2,100}|www\.[äöüa-zA-Z0-9][a-zA-Z0-9-]+[äöüaa-zA-Z0-9]\.[^\s]{2,100}|https?:\/\/(?:www\.|(?!www))[äöüa-zA-Z0-9]+\.[^\s]{2,100}|www\.[äöüa-zA-Z0-9]+\.[^\s]{2,100})/gm

export const hashRegex = /^0x[a-fA-F0-9]{64}$/gm

export const keyRegex = /^[a-zA-Z0-9+.\-_]+$/gm
// values for regex match
export const booleanValuesRegex = ['true', 'false', 'True', 'False', 'TRUE', 'FALSE', '1', '0']
export const numberRegex = /^\d+(\.\d+)*$/gm
export const from1to100Regex = /^[1-9][0-9]?$|^100$/gm
export const vaultID = /^[0-9]+$/gm
