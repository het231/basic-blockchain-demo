
# Blockchain Simulation Documentation

## Class: Block

### Constructor
- **Parameters:**
  - `index`: The position of the block in the blockchain.
  - `transactions`: The list of transactions included in the block.
  - `previousHash`: The hash of the previous block in the blockchain (default is an empty string).

### Methods

#### calculateHash
- **Description:** Calculates the hash of the block using its index, timestamp, Merkle root, and previous hash.
- **Returns:** The SHA-256 hash of the block.

#### calculateMerkleRoot
- **Description:** Calculates the Merkle root of the transactions in the block.
- **Returns:** The Merkle root of the transactions.

## Global Functions

### addTransaction
- **Description:** Adds a new transaction to the list of pending transactions.

### renderTransactions
- **Description:** Renders the list of pending transactions to the user interface.

### addBlock
- **Description:** Creates a new block with the pending transactions and adds it to the blockchain.

### renderBlockchain
- **Description:** Renders the entire blockchain to the user interface.

### editTransaction
- **Description:** Edits a transaction in a specific block and recalculates the block's Merkle root and hash.
- **Parameters:**
  - `blockIndex`: The index of the block containing the transaction.
  - `txIndex`: The index of the transaction within the block.
  - `field`: The field of the transaction to be edited (`from`, `to`, or `amount`).
  - `value`: The new value for the specified field.

### validateChain
- **Description:** Validates the entire blockchain to ensure its integrity.
- **Returns:** Alerts the user whether the blockchain is valid or invalid.
