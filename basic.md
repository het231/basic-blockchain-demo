# Blockchain Basics

This document explains the basic concepts of blockchain covered in the demo.

## 1. Blocks

A **block** is a container for data. In our demo, each block contains:
- An **index**: The position of the block in the chain.
- A **timestamp**: The time when the block was created.
- A list of **transactions**: Each transaction records a transfer of value.
- A **previous hash**: The hash of the previous block in the chain.
- A **Merkle root**: A single hash representing all transactions in the block.
- A **hash**: A unique identifier for the block, calculated from its contents.

## 2. Transactions

A **transaction** is a record of a transfer of value. In our demo, each transaction includes:
- **From**: The sender of the value.
- **To**: The receiver of the value.
- **Amount**: The amount of value transferred.

## 3. Hashes

A **hash** is a fixed-size string generated from input data using a hash function. In our demo, we use SHA-256 to generate hashes. Hashes are used to:
- Identify blocks uniquely.
- Ensure data integrity (any change in the data changes the hash).

## 4. Merkle Tree

A **Merkle tree** is a binary tree of hashes. It allows efficient and secure verification of the integrity of large sets of data. In our demo:
- Each transaction is hashed.
- Pairs of transaction hashes are combined and hashed to form parent nodes.
- This process continues until a single hash, the **Merkle root**, is obtained.

## 5. Immutability

**Immutability** means that once data is written, it cannot be changed. In our demo:
- Each block's hash depends on its contents and the previous block's hash.
- Changing any transaction changes the block's hash and Merkle root, breaking the chain.

## 6. Validation

**Validation** ensures the integrity of the blockchain. In our demo:
- Each block's hash is recalculated and compared to its stored hash.
- Each block's previous hash is compared to the previous block's hash.
- Each block's Merkle root is recalculated and compared to its stored Merkle root.
- Any discrepancy indicates tampering.
