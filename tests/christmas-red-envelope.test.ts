import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe('Christmas Red Envelope', () => {
  it('funds and claims an envelope', () => {
    // 1. Wallet 1 puts 100 STX in an envelope for Wallet 2
    const fund = simnet.callPublicFn(
        'christmas-red-envelope', 
        'fund-envelope', 
        [Cl.uint(100), Cl.standardPrincipal(wallet2)], 
        wallet1
    );
    expect(fund.result).toBeOk(Cl.bool(true));

    // 2. Wallet 2 claims it
    const claim = simnet.callPublicFn(
        'christmas-red-envelope', 
        'claim-envelope', 
        [Cl.standardPrincipal(wallet1)], 
        wallet2
    );
    expect(claim.result).toBeOk(Cl.bool(true));
  });
});