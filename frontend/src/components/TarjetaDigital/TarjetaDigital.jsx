import mockupTarjeta from '../../images/MOCKUP+TARJETA+DIGITAL+CELULAR.webp';
import './TarjetaDigital.css';

const TarjetaDigital = () => {
  return (
    <section className="tarjeta-digital">
      <div className="container tarjeta-container">
        <div className="tarjeta-content">
          <h2 className="tarjeta-title">
            Obtené tu tarjeta de crédito digital sin filas y sin costos
          </h2>
          
          <ul className="tarjeta-list">
            <li>
              <span className="check-icon">✓</span>
              <p>Aprobación 100% digital.</p>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <p>Sin cobro de membresía</p>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <p>Disponible para utilizarla desde tu billetera electrónica.</p>
            </li>
          </ul>

          <button className="btn-outline-blue">QUIERO UNA TARJETA</button>
        </div>

        <div className="tarjeta-image">
          <img src={mockupTarjeta} alt="Tarjeta Digital BCR" />
        </div>
      </div>
    </section>
  );
};

export default TarjetaDigital;
