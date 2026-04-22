import { useState } from 'react';
import './App.css';

function App() {
  // Claim data state
  const [claim, setClaim] = useState({
    claim_amount: '',
    age: '',
    vehicle_age: '',
    accident_severity: ''
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setClaim({ ...claim, [e.target.name]: e.target.value });
  };

  const checkFraud = async (e) => {
    e.preventDefault();
    try {
      // API call (Backend 5000 port par chalega)
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claim)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error: Backend se connect nahi ho pa raha. Check karo ki server chal raha hai.");
    }
  };

  return (
    <div className="app-container">
      <h1>Insurance Fraud Detection</h1>
      
      <form onSubmit={checkFraud}>
        <input name="claim_amount" placeholder="Claim Amount" onChange={handleInputChange} required />
        <input name="age" placeholder="Customer Age" onChange={handleInputChange} required />
        <input name="vehicle_age" placeholder="Vehicle Age" onChange={handleInputChange} required />
        <input name="accident_severity" placeholder="Severity (1-5)" onChange={handleInputChange} required />
        <button type="submit">Check Fraud</button>
      </form>

      {result && (
        <div className={`result-box ${result.fraud ? 'fraud' : 'safe'}`}>
          <h2>{result.fraud ? "⚠️ FRAUD DETECTED!" : "✅ Claim is Safe"}</h2>
          <p>Anomaly Score: {result.anomaly_score}</p>
        </div>
      )}
    </div>
  );
}

export default App;