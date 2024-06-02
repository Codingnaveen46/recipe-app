// src/components/TransactionForm.js
import React, { useState } from 'react';

function TransactionForm({ onDeposit, onWithdraw }) {
  const [amount, setAmount] = useState();

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleDeposit = () => {
    onDeposit(amount);
    setAmount(0);
  };

  const handleWithdraw = () => {
    onWithdraw(amount);
    setAmount(0);
  };

  return (
    <div>
      <h2>Make a Transaction</h2>
      <input 
        type="number" 
        value={amount} 
        onChange={handleAmountChange} 
        placeholder="Enter amount" 
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default TransactionForm;
