import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Personal Counter', () => {
  it('increments and reads count', () => {
    const inc = simnet.callPublicFn('personal-counter', 'increment', [], wallet1);
    expect(inc.result).toBeOk(Cl.bool(true));

    const read = simnet.callReadOnlyFn('personal-counter', 'get-count', [Cl.standardPrincipal(wallet1)], wallet1);
    expect(read.result).toBeOk(Cl.uint(1));
  });
});