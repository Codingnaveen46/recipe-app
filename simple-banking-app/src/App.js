// src/App.js
import React, { useState } from 'react';
import Account from './components/Account';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function App() {
  const [balance, setBalance] = useState(1000); // Initial balance
  const [transactions, setTransactions] = useState([]);

  const handleDeposit = (amount) => {
    if (amount > 0) {
      setBalance(balance + amount);
      setTransactions([...transactions, { type: 'Deposit', amount }]);
    } else {
      alert("Enter a valid amount!");
    }
  };

  const handleWithdraw = (amount) => {
    if (amount > 0) {
      if (amount <= balance) {
        setBalance(balance - amount);
        setTransactions([...transactions, { type: 'Withdraw', amount }]);
      } else {
        alert("Insufficient funds!");
      }
    } else {
      alert("Enter a valid amount!");
    }
  };

  const handleReset = () => {
    setBalance(1000); // Reset to initial balance
    setTransactions([]);
  };

  return (
    <div className="App">
      <h1>Simple Banking Application</h1>
      <Account balance={balance} />
      <TransactionForm onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
      <TransactionHistory transactions={transactions} />
      <button className="reset-button" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
