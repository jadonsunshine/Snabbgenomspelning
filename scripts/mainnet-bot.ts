import 'dotenv/config';
import { generateWallet } from '@stacks/wallet-sdk';
import { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, Cl } from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';

// --- CONFIGURATION ---
const MNEMONIC = process.env.MNEMONIC;
const SENDER_ADDRESS = 'SP3GAYKCWBD2PTNR77WGYWCPPR102C5E0C9MBGPS7'; 
const NETWORK = STACKS_MAINNET; 

// --- THE 7 CONTRACTS (FIXED) ---
const TARGETS = [
  // 1. Status Logger
  { 
    name: 'status-logger', 
    func: 'write-status', 
    args: [Cl.stringUtf8("Bot Active")] 
  },
  // 2. Personal Counter
  { 
    name: 'personal-counter', 
    func: 'increment', 
    args: [] 
  },
  // 3. Onchain Notepad
  { 
    name: 'onchain-notepad', 
    func: 'update-note', 
    args: [Cl.stringAscii("Automated entry")] 
  },
  // 4. Daily Check-in
  { 
    name: 'daily-checkin', 
    func: 'check-in', 
    args: [] 
  },
  // 5. Feedback Box
  { 
    name: 'feedback-box', 
    func: 'log-feedback', 
    args: [Cl.uint(5), Cl.stringAscii("Great system")] 
  },
  // 6. Simple Points
  { 
    name: 'simple-points', 
    func: 'earn-points', 
    args: [] 
  },
  // 7. Wallet Registry
  { 
    name: 'simple-wallet-registry', 
    func: 'register-name', 
    args: [Cl.stringAscii("JadonBot")] 
  }
];

let currentIndex = 0;

async function runBot() {
  console.log("------------------------------------------");
  if (!MNEMONIC) { console.error("❌ Error: No MNEMONIC in .env"); return; }

  try {
    // 1. Derive Key
    const wallet = await generateWallet({ secretKey: MNEMONIC, password: "" });
    const privateKey = wallet.accounts[0].stxPrivateKey;
    
    if (!privateKey) throw new Error("Failed to derive Private Key. Check Mnemonic.");

    // 2. Select Contract
    const target = TARGETS[currentIndex];
    console.log(`🤖 Bot Run ${currentIndex + 1}: [${target.name}]`);

    // 3. Prepare Options
    const txOptions = {
      contractAddress: SENDER_ADDRESS,
      contractName: target.name,
      functionName: target.func,
      functionArgs: target.args,
      senderKey: privateKey,
      network: NETWORK,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    };

    // 4. Build Transaction
    const transaction = await makeContractCall(txOptions);
    
    if (!transaction) {
      throw new Error("Transaction Builder returned Undefined. Library mismatch likely.");
    }

    // 5. Broadcast
    console.log("📡 Broadcasting...");
    const broadcastResponse = await broadcastTransaction({ transaction, network: NETWORK });
    
    if (broadcastResponse.error) {
      console.error(`❌ Transaction failed: ${broadcastResponse.reason}`);
    } else {
      console.log(`✅ Success! TX ID: 0x${broadcastResponse.txid}`);
      console.log(`🔗 https://explorer.hiro.so/txid/${broadcastResponse.txid}?chain=mainnet`);
    }

  } catch (error: any) {
    console.error("❌ CRITICAL ERROR:", error.message);
    if (error.stack) console.error(error.stack);
  }

  // 6. Update Index
  currentIndex = (currentIndex + 1) % TARGETS.length;
}

// Run once immediately
runBot();

// Run again every 2 MINUTES (120,000 ms)
// This prevents "TooMuchChaining" by waiting for the Bitcoin block
setInterval(runBot, 120000);