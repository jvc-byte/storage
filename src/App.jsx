import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./abi.json";

const contractAddress = "0x2D428792a33F093DC48e0F4FD7917D4e5e107c04";

function App() {
  const [number, setNumber] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [error, setError] = useState("");

  // Only allow MetaMask
  const isMetaMask = window.ethereum && window.ethereum.isMetaMask;

  const requestAccount = async () => {
    if (isMetaMask) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setError("");
      } catch (err) {
        setError("Failed to connect wallet: " + err.message);
      }
    } else {
      setError("Please install MetaMask! Other wallets are not supported.");
    }
  };

  const storeNumber = async (data) => {
    setError("");
    if (isMetaMask) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const tx = await contract.store(data);
        await tx.wait();
        setError("Number stored successfully!");
      } catch (error) {
        setError(
          "Error storing number: " + (error?.reason || error?.message || error)
        );
      }
    } else {
      requestAccount();
    }
  };

  const getNumber = async () => {
    setError("");
    setNumber("");
    if (isMetaMask) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const data = await contract.retrieve();
        setNumber(data.toString());
        setError("");
      } catch (error) {
        setError(
          "Error retrieving number: " +
            (error?.reason || error?.message || error)
        );
      }
    } else {
      requestAccount();
    }
  };

  return (
    <main>
      <nav className="navbar">
        <h3>Web3</h3>
        <button onClick={requestAccount}>Connect Wallet</button>
      </nav>

      <section className="container">
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="Enter a number"
          disabled={!isMetaMask}
        />
        <button onClick={() => storeNumber(newNumber)} disabled={!isMetaMask}>
          Send
        </button>

        <div className="result">
          <button onClick={getNumber} disabled={!isMetaMask}>
            Get
          </button>
        </div>
        <div>
          <h3> Stored Number: {number !== "" ? number : "Click on 'Get'."}</h3>
        </div>
        {error && (
          <div className="error" style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
