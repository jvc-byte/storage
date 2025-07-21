import { useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import abi from "./abi.json";

const contractAddress = '0x73ace4Ea21E73fE9532768B2Ac7B598171CD360B';

function App() {
  const [number, setNumber] = useState(0)

  const [newNumber, setNewNumber] = useState(0)

  const requestAccount = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      alert('Please install MetaMask!');
    }
  }

  const storeNumber = async (data) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.store(data);
        await tx.wait();
        console.log('Transaction successful:', tx);
      } catch (error) {
        console.error('Error storing number:', error);
      }
    } else {
      requestAccount();
    }
  }

  const getNumber = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);

      try {
        const data = await contract.retrieve();
        setNumber(data.toString());
      } catch (error) {
        console.error('Error retrieving number:', error);
      }

    } else {
      requestAccount();
    }
  }

  return (
    <main>
      <nav className='navbar'>
        <h3>Web3</h3>
        <button onClick={requestAccount}>Connect Wallet</button>
      </nav>


      <section className='container'>
        <input type="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder='Enter a number' />
        <button onClick={() => storeNumber(newNumber)}>Send</button>

        <div className='result'>
          <button onClick={getNumber}>Get</button>
          <h3>{number}</h3>
        </div>
      </section>
    </main>
  )
}

export default App
