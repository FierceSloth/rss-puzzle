import { stringRegex } from '@constants/constants';
import { validationErrorMessages } from '@constants/messages';

export function startsWithUppercase(name: string): boolean {
  if (!name) return false;
  return name[0] === name[0].toUpperCase();
}

export function hasMinLength(name: string, min: number): boolean {
  return name.length >= min;
}

export function hasMaxLength(name: string, max: number): boolean {
  return name.length <= max;
}

export function isValidString(name: string): boolean {
  const regex = stringRegex;
  return regex.test(name);
}

// ============ Main Functions ==================

interface IValidateResult {
  isValid: boolean;
  errorMessage?: string;
}

export function validateInput(name: string, minLength: number): IValidateResult {
  const maxLength = 15;

  const rules = [
    {
      condition: () => startsWithUppercase(name),
      errorMessage: validationErrorMessages.firstLetter,
    },
    {
      condition: () => hasMinLength(name, minLength),
      errorMessage: `Minimum length is ${minLength} characters`,
    },
    {
      condition: () => hasMaxLength(name, maxLength),
      errorMessage: validationErrorMessages.maxLength,
    },
    {
      condition: () => isValidString(name),
      errorMessage: validationErrorMessages.stringError,
    },
  ];

  const findRule = rules.find((rule) => !rule.condition());

  if (findRule) {
    return {
      isValid: false,
      errorMessage: findRule.errorMessage,
    };
  }

  return {
    isValid: true,
  };
}

export function isLoginValid(values: boolean[]): boolean {
  return values.every((isValid) => isValid);
}
