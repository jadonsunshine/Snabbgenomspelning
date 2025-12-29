import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Onchain Notepad', () => {
  it('writes and reads a note', () => {
    const write = simnet.callPublicFn('onchain-notepad', 'update-note', [Cl.stringAscii("Secret Note")], wallet1);
    expect(write.result).toBeOk(Cl.bool(true));

    const read = simnet.callReadOnlyFn('onchain-notepad', 'get-note', [Cl.standardPrincipal(wallet1)], wallet1);
    expect(read.result).toBeOk(Cl.some(Cl.stringAscii("Secret Note")));
  });
});