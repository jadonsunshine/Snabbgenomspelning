import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Simple Points', () => {
  it('earns points', () => {
    const earn = simnet.callPublicFn('simple-points', 'earn-points', [], wallet1);
    expect(earn.result).toBeOk(Cl.bool(true));
  });
});