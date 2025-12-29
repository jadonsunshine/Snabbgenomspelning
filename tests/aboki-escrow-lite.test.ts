import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const buyer = accounts.get("wallet_1")!;
const seller = accounts.get("wallet_2")!;

describe('Aboki Escrow', () => {
  it('completes an escrow flow', () => {
    // 1. Buyer deposits
    const deposit = simnet.callPublicFn('aboki-escrow-lite', 'deposit', [Cl.standardPrincipal(seller)], buyer);
    expect(deposit.result).toBeOk(Cl.bool(false));

    // 2. Buyer approves
    const approve = simnet.callPublicFn('aboki-escrow-lite', 'approve', [], buyer);
    expect(approve.result).toBeOk(Cl.bool(true));

    // 3. Seller withdraws
    const withdraw = simnet.callPublicFn('aboki-escrow-lite', 'withdraw', [], seller);
    expect(withdraw.result).toBeOk(Cl.bool(true));
  });
});