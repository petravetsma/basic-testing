// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const addTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 5, action: Action.Add, expected: 8 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: 24, b: 4, action: Action.Divide, expected: 6 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 3, action: null, expected: null },
  { a: 2, b: 3, action: 'Action', expected: null },
  { a: true, b: false, action: Action.Add, expected: null },
  { a: 123, b: 'false', action: Action.Add, expected: null },
];
describe('simpleCalculator', () => {
  test.each(addTestCases)(
    `should $a $action $b and return $expected`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
