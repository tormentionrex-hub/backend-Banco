import { useState, useEffect, useCallback } from 'react';
import { exchangeRates, transferFees } from '../../services/mockData';
import './CalculadoraDivisas.css';

const CalculadoraDivisas = () => {
  const [sendAmount, setSendAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [receivedAmount, setReceivedAmount] = useState(0);

  const calculate = useCallback(() => {
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    const fee = transferFees[fromCurrency] || transferFees.default;
    const result = (sendAmount - fee) * rate;
    setReceivedAmount(result > 0 ? result.toFixed(2) : 0);
  }, [sendAmount, fromCurrency, toCurrency]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="calculator-card">
      <div className="calc-input-group">
        <label>Tú envías</label>
        <div className="input-row">
          <input 
            type="number" 
            value={sendAmount}
            onChange={(e) => setSendAmount(Number(e.target.value))}
          />
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {Object.keys(exchangeRates).map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="calc-divider">
        <button className="swap-btn" onClick={handleSwap}>⇄</button>
      </div>

      <div className="calc-input-group">
        <label>El destinatario recibe</label>
        <div className="input-row readonly">
          <input type="text" value={receivedAmount} readOnly />
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {Object.keys(exchangeRates).map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="calc-breakdown">
        <div className="breakdown-item">
          <span>Comisión de transferencia:</span>
          <strong>${transferFees[fromCurrency] || transferFees.default}</strong>
        </div>
        <div className="breakdown-item">
          <span>Tasa de cambio:</span>
          <strong>1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]} {toCurrency}</strong>
        </div>
        <div className="arrival-badge">
          ⚡ Llega hoy — en segundos
        </div>
      </div>

      <button className="btn-primary full-width">Enviar dinero ahora</button>
      
      <p className="calc-note">Tu primera transferencia es gratis hasta $2,000</p>
    </div>
  );
};

export default CalculadoraDivisas;
