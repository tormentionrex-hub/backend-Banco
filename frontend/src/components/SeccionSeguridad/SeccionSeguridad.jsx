import './SeccionSeguridad.css';

const SeccionSeguridad = () => {
  return (
    <section className="security-nature">
      <div className="container security-grid-bcr">
        <div className="security-content-bcr">
          <h2 className="security-title-bcr">Protegemos lo que más importa</h2>
          <p className="security-desc-bcr">
            Como la naturaleza de Costa Rica, tu seguridad es nuestra prioridad. Utilizamos tecnología de vanguardia para que tu dinero esté siempre a salvo.
          </p>
          <div className="security-badges-bcr">
            <div className="badge-item">
              <span className="badge-icon">🛡️</span>
              <div>
                <h4>Seguridad Total</h4>
                <p>Monitoreo 24/7 de tus transacciones.</p>
              </div>
            </div>
            <div className="badge-item">
              <span className="badge-icon">🌿</span>
              <div>
                <h4>Sostenibilidad</h4>
                <p>Comprometidos con el ambiente y el futuro de CR.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionSeguridad;
