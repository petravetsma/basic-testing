// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    const bankAccount = getBankAccount(balance);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    const error = new InsufficientFundsError(balance);
    expect(() => account.withdraw(200)).toThrow(error);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const senderAccount = getBankAccount(balance);
    const recieverAccount = getBankAccount(0);
    const error = new InsufficientFundsError(balance);
    expect(() => senderAccount.transfer(200, recieverAccount)).toThrow(error);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    const error = new TransferFailedError();
    expect(() => account.transfer(50, account)).toThrow(error);
  });

  test('should deposit money', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    account.deposit(200);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const balance = 300;
    const account = getBankAccount(balance);
    account.withdraw(200);
    expect(account.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const balance = 100;
    const senderAccount = getBankAccount(balance);
    const recieverAccount = getBankAccount(300);
    senderAccount.transfer(balance, recieverAccount);
    expect(recieverAccount.getBalance()).toBe(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const fetchedValue = 50;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(fetchedValue);
    const result = await account.fetchBalance();
    expect(result).toBe(fetchedValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchedValue = 50;
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(fetchedValue);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(fetchedValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
