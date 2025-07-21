
## Storage DApp

This is a simple decentralized application (DApp) built with React and Ethers.js that interacts with an Ethereum smart contract to store and retrieve a number on the blockchain. The project demonstrates basic Web3 concepts such as connecting to MetaMask, reading from, and writing to a smart contract.

### Features
- Connect your MetaMask wallet
- Store a number on the blockchain
- Retrieve the stored number from the blockchain

### Technologies Used
- React
- Ethers.js
- Vite
- MetaMask (for wallet connection)

### Smart Contract
The DApp interacts with a deployed smart contract at:

```
0x2D428792a33F093DC48e0F4FD7917D4e5e107c04
```

The contract ABI is included in `src/abi.json`.

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Visit `http://localhost:5173` in your browser.

4. **Connect MetaMask:**
   Click the "Connect Wallet" button and approve the connection in MetaMask.

5. **Store a number:**
   - Enter a number in the input field and click "Send" to store it on the blockchain.

6. **Retrieve the number:**
   - Click "Get" to fetch the stored number from the blockchain.

### Folder Structure

- `src/App.jsx` - Main React component with DApp logic
- `src/abi.json` - Smart contract ABI
- `public/` - Static assets
- `index.html` - Main HTML file

### Requirements
- Node.js and npm
- MetaMask extension installed in your browser

### Notes
- Make sure your MetaMask is connected to the correct network where the contract is deployed.
- This project is for educational purposes and should not be used in production without further security review.
