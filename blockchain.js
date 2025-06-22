class Block {
  constructor(index, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = new Date().toLocaleString();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.merkleRoot = this.calculateMerkleRoot();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoJS.SHA256(
      this.index + this.timestamp + this.merkleRoot + this.previousHash
    ).toString();
  }

  calculateMerkleRoot() {
    let hashes = this.transactions.map(tx => CryptoJS.SHA256(JSON.stringify(tx)).toString());
    while (hashes.length > 1) {
      if (hashes.length % 2 !== 0) {
        hashes.push(hashes[hashes.length - 1]);
      }
      let newHashes = [];
      for (let i = 0; i < hashes.length; i += 2) {
        newHashes.push(CryptoJS.SHA256(hashes[i] + hashes[i + 1]).toString());
      }
      hashes = newHashes;
    }
    return hashes[0] || '';
  }
}

let blockchain = [];
let pendingTransactions = [];

function addTransaction() {
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const amount = document.getElementById('amount').value;

  if (!from || !to || !amount) {
    alert("Please fill all transaction fields.");
    return;
  }

  pendingTransactions.push({ from, to, amount });
  renderTransactions();

  document.getElementById('from').value = '';
  document.getElementById('to').value = '';
  document.getElementById('amount').value = '';
}

function renderTransactions() {
  const list = document.getElementById('transactionList');
  list.innerHTML = '<h4>Pending Transactions:</h4>';
  pendingTransactions.forEach((tx, i) => {
    list.innerHTML += `<div class="transaction">#${i + 1}: ${tx.from} → ${tx.to} : ${tx.amount}</div>`;
  });
}

function addBlock() {
  if (pendingTransactions.length === 0) {
    alert("Add at least one transaction before creating a block.");
    return;
  }

  const previousBlock = blockchain[blockchain.length - 1];
  const newBlock = new Block(
    blockchain.length,
    [...pendingTransactions],
    previousBlock ? previousBlock.hash : '0'
  );

  blockchain.push(newBlock);
  pendingTransactions = [];
  renderTransactions();
  renderBlockchain();
}

function renderBlockchain() {
  const container = document.getElementById('blockchain');
  container.innerHTML = '';
  blockchain.forEach((block, i) => {
    const blockDiv = document.createElement('div');
    blockDiv.className = 'block';

    const txInputs = block.transactions.map((tx, j) => `
      <div class="transaction">
        <input type="text" value="${tx.from}" onchange="editTransaction(${i}, ${j}, 'from', this.value)" placeholder="From">
        <input type="text" value="${tx.to}" onchange="editTransaction(${i}, ${j}, 'to', this.value)" placeholder="To">
        <input type="number" value="${tx.amount}" onchange="editTransaction(${i}, ${j}, 'amount', this.value)" placeholder="Amount">
      </div>
    `).join('');

    blockDiv.innerHTML = `
      <strong>Block #${block.index}</strong><br>
      <small>${block.timestamp}</small><br><br>
      <div><strong>Transactions:</strong></div>
      ${txInputs}
      <div><strong>Merkle Root:</strong><small>${block.merkleRoot}</small></div>
      <div><strong>Prev Hash:</strong><small>${block.previousHash}</small></div>
      <div><strong>Hash:</strong><small>${block.hash}</small></div>
      <div id="error-${i}" class="validation-error" style="display:none;"></div>
    `;
    container.appendChild(blockDiv);
  });
}

function editTransaction(blockIndex, txIndex, field, value) {
  blockchain[blockIndex].transactions[txIndex][field] = value;
  blockchain[blockIndex].merkleRoot = blockchain[blockIndex].calculateMerkleRoot();
  blockchain[blockIndex].hash = blockchain[blockIndex].calculateHash();
  renderBlockchain();
}

function validateChain() {
  let valid = true;
  for (let i = 1; i < blockchain.length; i++) {
    const current = blockchain[i];
    const previous = blockchain[i - 1];
    const currentHash = current.calculateHash();
    const currentMerkle = current.calculateMerkleRoot();

    const errorDiv = document.getElementById(`error-${i}`);
    const blockDiv = document.getElementsByClassName('block')[i];
    errorDiv.style.display = 'none';
    blockDiv.classList.remove('invalid');

    if (current.previousHash !== previous.hash) {
      valid = false;
      errorDiv.innerText = "❌ Previous hash doesn't match.";
      errorDiv.style.display = 'block';
      blockDiv.classList.add('invalid');
    } else if (current.hash !== currentHash) {
      valid = false;
      errorDiv.innerText = "❌ Hash is invalid (data may have been tampered).";
      errorDiv.style.display = 'block';
      blockDiv.classList.add('invalid');
    } else if (current.merkleRoot !== currentMerkle) {
      valid = false;
      errorDiv.innerText = "❌ Merkle Root is invalid (transaction data may have been tampered).";
      errorDiv.style.display = 'block';
      blockDiv.classList.add('invalid');
    }
  }

  alert(valid ? "✅ Blockchain is valid!" : "❌ Blockchain is INVALID!");
}
