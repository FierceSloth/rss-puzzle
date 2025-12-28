import { validationErrorMessages } from '../constants/messages';

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
  const regex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
  return regex.test(name);
}

// ============ Main Functions ==================

interface IValidateResult {
  isValid: boolean;
  errorMessage?: string;
}

export function validateName(name: string): IValidateResult {
  if (!hasMinLength(name, 3)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.minNameLength,
    };
  }
  if (!hasMaxLength(name, 20)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.maxLength,
    };
  }
  if (!isValidString(name)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.stringError,
    };
  }
  if (!startsWithUppercase(name)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.firstLetter,
    };
  }
  return {
    isValid: true,
  };
}

export function validateSurName(name: string): IValidateResult {
  if (!hasMinLength(name, 4)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.minSurNameLength,
    };
  }
  if (!hasMaxLength(name, 20)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.maxLength,
    };
  }
  if (!isValidString(name)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.stringError,
    };
  }
  if (!startsWithUppercase(name)) {
    return {
      isValid: false,
      errorMessage: validationErrorMessages.firstLetter,
    };
  }
  return {
    isValid: true,
  };
}

export function isLoginValid(values: boolean[]): boolean {
  return values.every((isValid) => isValid);
}
