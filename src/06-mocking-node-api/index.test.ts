// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = jest.fn();
    const spyTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(timeout, 1000);
    expect(spyTimeout).toHaveBeenCalledWith(timeout, 1000);
  });

  test('should call callback only after timeout', () => {
    const timeout = jest.fn();
    doStuffByTimeout(timeout, 1000);

    expect(timeout).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(timeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.fn();
    const spyInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(interval, 1000);
    expect(spyInterval).toHaveBeenCalledWith(interval, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = jest.fn();
    doStuffByInterval(interval, 1000);

    jest.advanceTimersByTime(3000);

    expect(interval).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = 'file.txt';
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), filePath);
  });

  test('should return null if file does not exist', async () => {
    const path = 'null.txt';

    jest.mocked(existsSync).mockReturnValue(false);

    const result = await readFileAsynchronously(path);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const path = 'existing.txt';
    const content = 'test content';

    jest.mocked(existsSync).mockReturnValue(true);
    jest.mocked(readFile).mockResolvedValue(content);

    const result = await readFileAsynchronously(path);

    expect(result).toBe(content);
  });
});
