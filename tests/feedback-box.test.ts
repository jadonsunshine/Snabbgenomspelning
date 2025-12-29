import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

describe('Feedback Box', () => {
  it('logs feedback successfully', () => {
    const log = simnet.callPublicFn(
        'feedback-box', 
        'log-feedback', 
        [Cl.uint(5), Cl.stringAscii("Great job!")], 
        wallet1
    );
    // Expect success (ok true)
    expect(log.result).toBeOk(Cl.bool(true));
  });
});