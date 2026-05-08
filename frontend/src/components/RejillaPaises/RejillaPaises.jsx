import { useState } from 'react';
import { countries } from '../../services/mockData';
import './RejillaPaises.css';

const RejillaPaises = () => {
  const [activeTab, setActiveTab] = useState('enviar');

  return (
    <section className="countries-section">
      <div className="container">
        <h2 className="section-title text-center">Wise funciona casi en cualquier lugar</h2>
        
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'enviar' ? 'active' : ''}`}
            onClick={() => setActiveTab('enviar')}
          >
            Enviar dinero
          </button>
          <button 
            className={`tab ${activeTab === 'cuenta' ? 'active' : ''}`}
            onClick={() => setActiveTab('cuenta')}
          >
            Datos de cuenta
          </button>
          <button 
            className={`tab ${activeTab === 'convertir' ? 'active' : ''}`}
            onClick={() => setActiveTab('convertir')}
          >
            Mantener y convertir
          </button>
        </div>

        <div className="countries-grid">
          {countries.map((c, i) => (
            <div key={i} className="country-item">
              <span className="flag">{c.flag}</span>
              <span className="country-name">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-48">
          <button className="btn-outline">Ver todos los destinos →</button>
        </div>
      </div>
    </section>
  );
};

export default RejillaPaises;
