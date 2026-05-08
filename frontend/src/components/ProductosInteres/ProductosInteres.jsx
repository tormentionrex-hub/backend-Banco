import kolbiImg from '../../images/PLP+Tarjetas_Kolbi+cred+personas.webp';
import mcImg from '../../images/PLP+Tarjetas_MC+estándar.webp';
import visaImg from '../../images/PLP+Tarjetas_Visa+clásica.webp';
import './ProductosInteres.css';

const ProductosInteres = () => {
  const productos = [
    {
      img: kolbiImg,
      title: "Mastercard kölbi",
      benefits: [
        "Preventas exclusivas de dispositivos móviles",
        "Gigas adicionales en planes móviles",
        "Acumulás puntos por cada compra que realicés"
      ]
    },
    {
      img: mcImg,
      title: "Mastercard Estándar",
      benefits: [
        "Habilitada para billeteras electrónicas",
        "Sin cargos adicionales ni de anualidad",
        "Descuentos y promociones con Boom BCR Beneficios"
      ]
    },
    {
      img: visaImg,
      title: "Visa Clásica",
      benefits: [
        "Habilitada para billeteras electrónicas",
        "Sin cargos adicionales ni de anualidad",
        "Descuentos y promociones con Boom BCR Beneficios"
      ]
    }
  ];

  return (
    <section className="productos-interes">
      <div className="container">
        <h2 className="section-title text-center">Productos que te pueden interesar</h2>
        <div className="productos-grid">
          {productos.map((p, i) => (
            <div key={i} className="producto-card">
              <div className="producto-img-container">
                <img src={p.img} alt={p.title} />
              </div>
              <h3>{p.title}</h3>
              <ul className="beneficios-lista">
                {p.benefits.map((b, idx) => (
                  <li key={idx}>
                    <span className="bullet-icon">✨</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="producto-actions">
                <button className="btn-solicitar">SOLICITAR TARJETA</button>
                <a href="#" className="link-conocer">CONOCER MÁS</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductosInteres;
