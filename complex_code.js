/*  complex_code.js

This JavaScript file contains a complex and sophisticated code example that demonstrates the implementation of a blockchain using a proof-of-work algorithm.

Author: John Doe
Date: July 15, 2022
*/

// --- Block Class ---
class Block {
    constructor(index, previousHash, timestamp, data, difficulty) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = 0;
        this.hash = "";
    }

    calculateHash() {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.difficulty +
            this.nonce
        ).toString();
    }

    mineBlock() {
        while (
            this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

// --- Blockchain Class ---
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "0", Date.now(), "Genesis Block", this.difficulty);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// --- Usage Example ---
let blockchain = new Blockchain();
console.log("Mining block 1...");
blockchain.addBlock(new Block(1, "", Date.now(), { amount: 4 }));
console.log("Mining block 2...");
blockchain.addBlock(new Block(2, "", Date.now(), { amount: 8 }));

console.log("Is blockchain valid? " + blockchain.isChainValid());