// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = ['head', 'second', 'last'];

    const objList = {
      value: 'head',
      next: {
        value: 'second',
        next: {
          value: 'last',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(list);
    expect(result).toStrictEqual(objList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3];
    const result = generateLinkedList(input);

    expect(result).toMatchSnapshot();
  });
});
