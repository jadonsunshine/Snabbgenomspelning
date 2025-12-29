import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Prediction Market', () => {
  it('votes yes', () => {
    const vote = simnet.callPublicFn('prediction-market-lite', 'vote-yes', [], wallet1);
    // Returns new pool amount (1000)
    expect(vote.result).toBeOk(Cl.uint(1000));
  });
});