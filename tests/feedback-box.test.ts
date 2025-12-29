import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Feedback Box', () => {
  it('logs feedback successfully', () => {
    // 1. Log 5-star feedback
    const log = simnet.callPublicFn(
        'feedback-box', 
        'log-feedback', 
        [Cl.uint(5), Cl.stringAscii("Great job!")], 
        wallet1
    );
    // Returns next ID (which should be 1)
    expect(log.result).toBeOk(Cl.uint(1));
  });
});