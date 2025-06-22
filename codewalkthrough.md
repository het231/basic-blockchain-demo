# Code Walkthrough

This document explains the HTML and JavaScript functionality of the blockchain demo.

## HTML Structure

### index.html

- **Header**: Contains the title and links to CSS and JavaScript files.
- **Reference Block**: A static visual block to help understand the structure.
- **Input Area**: Fields to add transactions and buttons to add blocks and validate the chain.
- **Blockchain Display**: A container to display the blockchain.

## JavaScript Functionality

### blockchain.js

- **Block Class**: Represents a block in the blockchain.
  - `constructor(index, transactions, previousHash)`: Initializes a block.
  - `calculateHash()`: Calculates the block's hash.
  - `calculateMerkleRoot()`: Calculates the Merkle root from transactions.

- **Global Variables**:
  - `blockchain`: An array to store the blockchain.
  - `pendingTransactions`: An array to store transactions before adding them to a block.

- **Functions**:
  - `addTransaction()`: Adds a transaction to `pendingTransactions`.
  - `renderTransactions()`: Displays pending transactions.
  - `addBlock()`: Creates a new block with pending transactions and adds it to the blockchain.
  - `renderBlockchain()`: Displays the blockchain.
  - `editTransaction(blockIndex, txIndex, field, value)`: Edits a transaction and updates the block's hash and Merkle root.
  - `validateChain()`: Validates the blockchain by checking hashes and Merkle roots.

## Validation Logic

- **Hash Validation**: Recalculates each block's hash and compares it to the stored hash.
- **Previous Hash Validation**: Compares each block's previous hash to the previous block's hash.
- **Merkle Root Validation**: Recalculates each block's Merkle root and compares it to the stored Merkle root.

Any discrepancy indicates tampering and invalidates the blockchain.
