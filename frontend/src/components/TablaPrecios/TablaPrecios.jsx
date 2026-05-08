import { useState } from 'react';
import { exchangeRates, comparisonData } from '../../services/mockData';
import './TablaPrecios.css';

const TablaPrecios = () => {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const rate = exchangeRates[from]?.[to] || 1;
  const wiseResult = amount * rate;
  
  const bankAResult = wiseResult * (1 - comparisonData.bankA.rateMarkup);
  const bankBResult = wiseResult * (1 - comparisonData.bankB.rateMarkup);

  return (
    <section className="pricing-section">
      <div className="container">
        <h2 className="section-title">Precios 100% transparentes</h2>
        <p className="section-subtitle">Los bancos inflan la tasa de cambio para ocultar comisiones. Nosotros no.</p>

        <div className="pricing-controls">
          <input 
            type="number" 
            className="pricing-input"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(exchangeRates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="arrow-right">→</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(exchangeRates).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Detalles</th>
                <th className="wise-col">Wise (Nosotros)</th>
                <th>{comparisonData.bankA.name}</th>
                <th>{comparisonData.bankB.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>El destinatario recibe</td>
                <td className="wise-col highlighted">{wiseResult.toFixed(2)} {to} <span className="best-badge">Mejor ✓</span></td>
                <td>{bankAResult.toFixed(2)} {to}</td>
                <td>{bankBResult.toFixed(2)} {to}</td>
              </tr>
              <tr>
                <td>Tasa de cambio</td>
                <td className="wise-col">{rate}</td>
                <td>{(rate * 0.96).toFixed(4)}</td>
                <td>{(rate * 0.95).toFixed(4)}</td>
              </tr>
              <tr>
                <td>Costo total</td>
                <td className="wise-col">$0.00</td>
                <td className="diff-cost">-${(wiseResult - bankAResult).toFixed(2)}</td>
                <td className="diff-cost">-${(wiseResult - bankBResult).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <button className="btn-outline">Comparar todos los proveedores →</button>
        </div>
      </div>
    </section>
  );
};

export default TablaPrecios;
