// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

const relativePath = '/api';
const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  const mockedCreate = axios.create as jest.Mock;
  const mockedAxios = {
    get: jest.fn(),
  };

  beforeEach(() => {
    mockedCreate.mockReturnValue(mockedAxios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi(relativePath);

    expect(mockedCreate).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = { version: '1.0.0' };

    mockedAxios.get.mockResolvedValue({ data });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(data);
  });
});
