import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Wallet Registry', () => {
  it('registers a name', () => {
    const reg = simnet.callPublicFn('simple-wallet-registry', 'register-name', [Cl.stringAscii("Jadon")], wallet1);
    expect(reg.result).toBeOk(Cl.bool(true));

    const read = simnet.callReadOnlyFn('simple-wallet-registry', 'get-name', [Cl.standardPrincipal(wallet1)], wallet1);
    expect(read.result).toBeOk(Cl.some(Cl.stringAscii("Jadon")));
  });
});