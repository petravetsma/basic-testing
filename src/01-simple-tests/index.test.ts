// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Add })).toBe(8);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
    expect(simpleCalculator({ a: 4, b: 5, action: Action.Multiply })).toBe(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 5, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: 24, b: 4, action: Action.Divide })).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    expect(simpleCalculator({ a: 2, b: 3, action })).toBe(8);
    expect(simpleCalculator({ a: 3, b: 3, action })).toBe(27);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: null })).toBeNull();
    expect(simpleCalculator({ a: 2, b: 3, action: 'Action' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: true, b: false, action: null })).toBeNull();
    expect(simpleCalculator({ a: 123, b: 'false', action: null })).toBeNull();
  });
});
