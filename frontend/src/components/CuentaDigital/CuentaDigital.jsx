import mockupPhones from '../../images/Home-Mockup-Cuenta-digital-BCR.webp';
import './CuentaDigital.css';

const CuentaDigital = () => {
  return (
    <section className="cuenta-digital">
      <div className="container cuenta-container">
        <div className="cuenta-content">
          <h2 className="cuenta-title">
            Tu primer paso para ser cliente BCR: abrí tu cuenta de ahorro desde tu celular
          </h2>
          
          <ul className="cuenta-list">
            <li>
              <span className="check-icon">✓</span>
              <p>Solicitala en línea, sin filas, sin trámites.</p>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <p>Queda activa en minutos.</p></li>
            <li>
              <span className="check-icon">✓</span>
              <p>Habilitada para agregar tu tarjeta en billeteras electrónicas.</p>
            </li>
          </ul>

          <button className="btn-outline-blue">QUIERO UNA CUENTA</button>
        </div>

        <div className="cuenta-image">
          <img src={mockupPhones} alt="Mockup BCR App" />
        </div>
      </div>
    </section>
  );
};

export default CuentaDigital;
