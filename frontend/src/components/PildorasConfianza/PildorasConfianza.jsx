import './PildorasConfianza.css';

const PildorasConfianza = () => {
  return (
    <section className="benefits-section">
      <div className="container benefits-grid">
        <div className="benefit-image">
          <div className="icon-wrapper">🎁</div>
        </div>
        <div className="benefit-text">
          <h3>¿Qué beneficios obtendré?</h3>
          <ul>
            <li>Tasa desde 14% anual para clientes de más de 6 meses con productos BCR activos (16% anual para clientes nuevos).</li>
            <li>Plazo de 60 meses.</li>
            <li>Acompañamiento personalizado de un asesor BCR durante todo el proceso.</li>
            <li>Mejorá tus condiciones financieras y simplificá tus pagos.</li>
            <li>Aplican restricciones.</li>
          </ul>
        </div>
      </div>

      <div className="container benefits-grid mt-64">
        <div className="benefit-image">
          <div className="icon-wrapper">💳</div>
        </div>
        <div className="benefit-text">
          <h3>¿Cómo puedo trasladar mis saldos?</h3>
          <ul>
            <li>Hacé clic en “Solicitar traslado”, completá tus datos y un asesor te contactará.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PildorasConfianza;
