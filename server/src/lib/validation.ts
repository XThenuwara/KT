import { isDate } from 'util/types';
import { CreateStudentDto } from '../student/dto/createStudent.dto';

export function isEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function isEmptyObj(obj: any): boolean {
  return Object.keys(obj).length === 0;
}

export function isEmptyString(str: string): boolean {
  return str.trim().length === 0;
}

export function isEmptyArray(arr: any[]): boolean {
  return arr.length === 0;
}

export function isStudentCreate(obj: CreateStudentDto): boolean {
  if (!obj) return false;
  if (
    isEmail(obj.email) &&
    !isEmptyObj(obj) &&
    !isEmptyString(obj.name) &&
    isDate(obj.dob) &&
    !isNaN(obj.age)
  )
    return true;
}

export function isCorrectHeading(titles: any[]) {
  if (
    !titles.includes('email') ||
    !titles.includes('name') ||
    !titles.includes('dob') ||
    titles.length > 3
  ) {
    return false;
  }
  return true;
}

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}
