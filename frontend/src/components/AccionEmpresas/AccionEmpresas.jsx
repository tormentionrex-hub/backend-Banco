import './AccionEmpresas.css';

const AccionEmpresas = () => {
  return (
    <section className="business-section">
      <div className="container business-grid">
        <div className="business-content">
          <h2 className="section-title">También diseñado para empresas</h2>
          <p className="business-stat">Más de 700,000 empresas confían en Wise</p>
          <p className="section-desc">
            Paga a empleados, factura a clientes y gestiona tus gastos internacionales sin las altas comisiones de los bancos tradicionales.
          </p>
          <div className="business-btns">
            <button className="btn-primary">Probar demo</button>
            <button className="btn-outline">Saber más</button>
          </div>
        </div>
        
        <div className="business-visual">
          <div className="placeholder-business">
            <span className="business-icon">🏢</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccionEmpresas;
