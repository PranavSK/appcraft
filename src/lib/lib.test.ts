import { describe, expect, it } from 'vitest';

import { mapToClosestBreakpoint } from '#/lib/breakpoint';

import {
  approxeq,
  findClosestNumber,
  getFactors,
  getPrimeFactors,
  getProgress,
  getValueFromProgress,
  range,
} from './math';

describe('lib', () => {
  describe('breakpoint', () => {
    describe('mapToClosestBreakpoint', () => {
      it('should return DEFAULT if no breakpoints are provided', () => {
        expect(mapToClosestBreakpoint('sm')).toBe('DEFAULT');
      });
      it('should return the breakpoint if it is in the list', () => {
        expect(mapToClosestBreakpoint('sm', ['DEFAULT', 'sm', 'md'])).toBe('sm');
      });
      it('should return the closest breakpoint if it is not in the list', () => {
        expect(mapToClosestBreakpoint('sm', ['DEFAULT', 'md', 'lg'])).toBe('DEFAULT');
        expect(mapToClosestBreakpoint('lg', ['DEFAULT', 'md', 'xl'])).toBe('md');
      });
    });
  });

  describe('math', () => {
    describe('approxeq', () => {
      it('should return true if the values are within epsilon', () => {
        expect(approxeq(1, 1.0001, 0.001)).toBe(true);
      });
      it('should return false if the values are not within epsilon', () => {
        expect(approxeq(1, 1.0001, 0.0001)).toBe(false);
      });
    });
    describe('getProgress', () => {
      it('should return the progress between min and max', () => {
        expect(getProgress(5, 0, 10)).toBe(0.5);
      });
      it('should return 0 if the value is less than min', () => {
        expect(getProgress(-5, 0, 10)).toBe(0);
      });
      it('should return 1 if the value is greater than max', () => {
        expect(getProgress(15, 0, 10)).toBe(1);
      });
    });
    describe('getValueFromProgress', () => {
      it('should return the value between min and max', () => {
        expect(getValueFromProgress(0.5, 0, 10)).toBe(5);
      });
      it('should return min if the progress is less than 0', () => {
        expect(getValueFromProgress(-0.5, 0, 10)).toBe(0);
      });
      it('should return max if the progress is greater than 1', () => {
        expect(getValueFromProgress(1.5, 0, 10)).toBe(10);
      });
    });
    describe('findClosestNumber', () => {
      it('should return the closest number in the list', () => {
        expect(findClosestNumber([1, 2, 3, 4, 5], 3.5)).toBe(4);
      });
      it('should return the closest number in the list', () => {
        expect(findClosestNumber([1, 2, 3, 4, 5], 3.2)).toBe(3);
      });
      it('should return the closest number in the list', () => {
        expect(findClosestNumber([1, 2, 3, 4, 5], 3.8)).toBe(4);
      });
    });

    describe('range', () => {
      it('should return an array of integers given only max value', () => {
        expect(range(5)).toEqual([0, 1, 2, 3, 4, 5]);
      });
      it('should return an array of integers given max and start value', () => {
        expect(range(5, 2)).toEqual([2, 3, 4, 5]);
      });
      it('should return an array of integers given max, start, and step value', () => {
        expect(range(5, 2, 2)).toEqual([2, 4]);
      });
      it('should return an empty array if step is 0', () => {
        expect(range(5, 2, 0)).toEqual([]);
      });
    });

    describe('getFactors', () => {
      it('should return the factors of the given number including one and self', () => {
        expect(getFactors(10)).toEqual([1, 2, 5, 10]);
      });
      it('should return the factors of the given number', () => {
        expect(getFactors(10, false)).toEqual([2, 5]);
      });
    });

    describe('getPrimeFactors', () => {
      it('should return the prime factors of the given number', () => {
        expect(getPrimeFactors(10)).toEqual([2, 5]);
      });
    });
  });
});
