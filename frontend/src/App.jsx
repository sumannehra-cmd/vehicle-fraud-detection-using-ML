import { useState } from 'react';
import './App.css';

function App() {
  const [claim, setClaim] = useState({ claim_amount: '', age: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Student 1 jab backend banaye, toh localhost:5000 call hoga
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claim)
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container">
      <h1>Insurance Fraud Detection</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Amount" onChange={(e) => setClaim({...claim, claim_amount: e.target.value})} />
        <input placeholder="Age" onChange={(e) => setClaim({...claim, age: e.target.value})} />
        <button type="submit">Check Fraud</button>
      </form>
      {result && <h2>{result.fraud ? "Fraud Detected" : "Safe"}</h2>}
    </div>
  );
}
export default App;