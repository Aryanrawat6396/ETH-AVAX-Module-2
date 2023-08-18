import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import MyTokenABI from "./contracts/MyToken.sol/MyToken.json";
import "./App.css";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the deployed contract address
const contractABI = MyTokenABI.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const myTokenContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider.getSigner()
);

function App() {
  const [accountAddress, setAccountAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [balance, setBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [isConnected, setIsConnected] = useState(false); // State to track Metamask connection

  useEffect(() => {
    async function setup() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccountAddress(accounts[0]);

        const ownerName = await myTokenContract.getOwnerName();
        setOwnerName(ownerName);

        const balance = await myTokenContract.balanceOf(accounts[0]);
        setBalance(balance.toString());

        setIsConnected(true); // Set Metamask connection status
      } else {
        console.error("No Ethereum provider found.");
      }
    }

    setup();
  }, []);

  const handleMint = async () => {
  try {
    const tx = await myTokenContract.mint(
      accountAddress,
      ethers.utils.parseUnits(mintAmount, 18)
    );
    await tx.wait();
    const updatedBalance = await myTokenContract.balanceOf(accountAddress);
    setBalance(updatedBalance.toString());
    toast.success("Minting successful!");
  } catch (error) {
    console.error("Error minting tokens:", error);
    toast.error("Minting failed!");
  }
};

const handleBurn = async () => {
  try {
    const tx = await myTokenContract.burn(
      ethers.utils.parseUnits(burnAmount, 18)
    );
    await tx.wait();
    const updatedBalance = await myTokenContract.balanceOf(accountAddress);
    setBalance(updatedBalance.toString());
    toast.success("Burning successful!");
  } catch (error) {
    console.error("Error burning tokens:", error);
    toast.error("Burning failed!");
  }
};


  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-heading">My Token App</h1>
        <div className="account-info">
  <p><strong>Account Address:</strong> {accountAddress}</p>
  <p><strong>Owner Name:</strong> {ownerName}</p>
  <p><strong>Balance:</strong> {balance} Tokens</p>
  <p><strong>Metamask Connected:</strong> {isConnected ? "Yes" : "No"}</p>
</div>

        <div className="token-actions">
          <div className="action">
            <input
              type="text"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="Enter amount to mint"
            />
            <button className="mint-button" onClick={handleMint}>Mint</button>
          </div>
          <div className="action">
            <input
              type="text"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              placeholder="Enter amount to burn"
            />
            <button className="burn-button" onClick={handleBurn}>Burn</button>
          </div>
           <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
