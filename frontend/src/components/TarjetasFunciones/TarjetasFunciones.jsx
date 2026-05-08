import './TarjetasFunciones.css';

const funciones = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/7048/7048779.png",
    title: "Cuentas",
    desc: "Ahorro, Corriente y más. Diseñadas para tus metas.",
    link: "Ver opciones →"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/9063/9063313.png",
    title: "Tarjetas",
    desc: "Crédito y Débito con beneficios exclusivos en comercios.",
    link: "Solicitar →"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2168/2168771.png",
    title: "Préstamos",
    desc: "Vivienda, Vehículo y Consumo con tasas competitivas.",
    link: "Simular →"
  }
];

const TarjetasFunciones = () => {
  return (
    <section className="features-bcr">
      <div className="container">
        <h2 className="section-title text-center">Todo lo que necesitás en un solo lugar</h2>
        <div className="features-grid-bcr">
          {funciones.map((f, i) => (
            <div key={i} className="feature-card-bcr">
              <div className="card-icon">
                <img src={f.icon} alt={f.title} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <a href="#" className="card-link">{f.link}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TarjetasFunciones;
