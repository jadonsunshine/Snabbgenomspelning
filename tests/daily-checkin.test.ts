import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Daily Check-in', () => {
  it('checks in successfully', () => {
    // 1. Advance chain so block height > 0
    simnet.mineEmptyBlocks(5);

    // 2. Check in
    const checkin = simnet.callPublicFn('daily-checkin', 'check-in', [], wallet1);
    expect(checkin.result).toBeOk(Cl.bool(true));
  });
});