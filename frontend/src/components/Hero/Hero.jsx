import videoHeader from '../../images/bancoHeader.mp4';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-bcr">
      <div className="hero-banner">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
        >
          <source src={videoHeader} type="video/mp4" />
        </video>
        
        <div className="container banner-content">
          {/* LADO IZQUIERDO */}
          <div className="hero-left">
            <h1 className="hero-title">
              <span className="small-text">¡Pagá</span>
              <span className="mid-text">menos y</span>
              <span className="big-text">viví</span>
              <span className="big-text">mejor!</span>
            </h1>
          </div>

          {/* LADO DERECHO */}
          <div className="hero-right">
            <p className="promo-desc">
              Te compramos el <br />
              saldo de tus tarjetas <br />
              con una tasa desde el
            </p>
            <div className="rate-graphic">
              <div className="rate-number-box">
                <span className="main-rate">14</span>
                <span className="percent-sign">%</span>
              </div>
              <div className="rate-label-box">
                <span className="label-de">de</span>
                <span className="label-interes">interés</span>
                <span className="red-arrow">◀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-cta-section">
        <div className="container cta-content">
          <h2>Trasladá el saldo de tus tarjetas al BCR</h2>
          <p>Accedé a mejores condiciones y una cuota desde el 14% anual</p>
          <button className="btn-primary-bcr">SOLICITAR TRASLADO</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
