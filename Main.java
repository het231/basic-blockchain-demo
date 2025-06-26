
import java.util.ArrayList;
import java.util.Date;

/**
 * Represents a transaction in the blockchain.
 */
class Transaction {
    public String sender;
    public String receiver;
    public int amount;

    /**
     * Constructor to initialize a transaction.
     * @param sender The sender's name.
     * @param receiver The receiver's name.
     * @param amount The amount being transferred.
     */
    public Transaction(String sender, String receiver, int amount) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
    }

    @Override
    public String toString() {
        return sender + " sent " + amount + " to " + receiver;
    }
}

/**
 * Represents a block in the blockchain.
 */
class Block {
    public int index;
    public long timestamp;
    public ArrayList<Transaction> transactions;
    public String previousHash;
    public String hash;

    /**
     * Constructor to initialize a block.
     * @param index The index of the block.
     * @param timestamp The timestamp of the block creation.
     * @param transactions The list of transactions in the block.
     * @param previousHash The hash of the previous block.
     */
    public Block(int index, long timestamp, ArrayList<Transaction> transactions, String previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = calculateHash();
    }

    /**
     * Calculates the hash of the block.
     * @return The hash of the block.
     */
    public String calculateHash() {
        String dataToHash = "" + index + timestamp + transactions.toString() + previousHash;
        return Integer.toHexString(dataToHash.hashCode());
    }

    @Override
    public String toString() {
        return "Block #" + index + " [previousHash: " + previousHash + ", hash: " + hash + ", transactions: " + transactions + "]";
    }
}

/**
 * Represents the blockchain.
 */
class Blockchain {
    public ArrayList<Block> chain;

    /**
     * Constructor to initialize the blockchain with the genesis block.
     */
    public Blockchain() {
        chain = new ArrayList<>();
        chain.add(createGenesisBlock());
    }

    /**
     * Creates the genesis block (the first block in the blockchain).
     * @return The genesis block.
     */
    public Block createGenesisBlock() {
        return new Block(0, new Date().getTime(), new ArrayList<>(), "0");
    }

    /**
     * Gets the latest block in the blockchain.
     * @return The latest block.
     */
    public Block getLatestBlock() {
        return chain.get(chain.size() - 1);
    }

    /**
     * Adds a new block to the blockchain.
     * @param transactions The list of transactions to be included in the new block.
     */
    public void addBlock(ArrayList<Transaction> transactions) {
        Block latestBlock = getLatestBlock();
        Block newBlock = new Block(latestBlock.index + 1, new Date().getTime(), transactions, latestBlock.hash);
        chain.add(newBlock);
    }

    /**
     * Validates the blockchain.
     * @return True if the blockchain is valid, false otherwise.
     */
    public boolean isChainValid() {
        for (int i = 1; i < chain.size(); i++) {
            Block currentBlock = chain.get(i);
            Block previousBlock = chain.get(i - 1);

            // Check if the current block's hash is valid
            if (!currentBlock.hash.equals(currentBlock.calculateHash())) {
                return false;
            }

            // Check if the previous block's hash matches the current block's previous hash
            if (!currentBlock.previousHash.equals(previousBlock.hash)) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Main class to demonstrate the blockchain functionality.
 */
public class Main {
    public static void main(String[] args) {
        Blockchain blockchain = new Blockchain();

        System.out.println("Blockchain created. Initial state:");
        System.out.println(blockchain.chain);

        // Create and add the first block with transactions
        ArrayList<Transaction> transactions1 = new ArrayList<>();
        transactions1.add(new Transaction("Amit", "Bhavesh", 100));
        transactions1.add(new Transaction("Chitra", "Deepak", 200));
        transactions1.add(new Transaction("Esha", "Farhan", 300));
        blockchain.addBlock(transactions1);

        System.out.println("After adding first block:");
        System.out.println(blockchain.chain);

        // Create and add more blocks with transactions
        ArrayList<Transaction> transactions2 = new ArrayList<>();
        transactions2.add(new Transaction("Gita", "Hari", 400));
        transactions2.add(new Transaction("Isha", "Jay", 500));
        blockchain.addBlock(transactions2);

        ArrayList<Transaction> transactions3 = new ArrayList<>();
        transactions3.add(new Transaction("Kiran", "Lata", 600));
        blockchain.addBlock(transactions3);

        ArrayList<Transaction> transactions4 = new ArrayList<>();
        transactions4.add(new Transaction("Mohan", "Nina", 700));
        blockchain.addBlock(transactions4);

        System.out.println("After adding more blocks:");
        System.out.println(blockchain.chain);

        // Validate the blockchain
        System.out.println("Is blockchain valid? " + blockchain.isChainValid());

        // Attempt to tamper with the blockchain
        blockchain.chain.get(1).transactions.get(0).amount = 1000;

        System.out.println("After attempting to tamper with the blockchain:");
        System.out.println(blockchain.chain);

        // Validate the blockchain again
        System.out.println("Is blockchain valid? " + blockchain.isChainValid());
    }
}
