import './PiePagina.css';

const PiePagina = () => {
  return (
    <footer className="footer-bcr">
      <div className="container">
        <div className="footer-grid-bcr">
          <div className="footer-col-bcr">
            <div className="footer-logo-box">
              <span className="logo-text-footer">BCR</span>
              <span className="logo-tag-footer">Somos el banco de Costa Rica</span>
            </div>
            <h4>Contactanos</h4>
            <ul className="contact-list">
              <li><span className="icon">📧</span> Centro de Asistencia</li>
              <li><span className="icon">📞</span> 2211-1111</li>
              <li><span className="icon">💬</span> 2211-1135</li>
              <li><span className="icon">📍</span> Ubicanos</li>
            </ul>
          </div>
          
          <div className="footer-col-bcr">
            <h4>Información</h4>
            <ul>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Transparencia</a></li>
              <li><a href="#">Mapa del sitio</a></li>
              <li><a href="#">Reglamentos</a></li>
              <li><a href="#">Seguridad</a></li>
              <li><a href="#">Contraloría</a></li>
              <li><a href="#">Tarifario</a></li>
              <li><a href="#">Empleo</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col-bcr">
            <h4>Solicitudes</h4>
            <ul>
              <li><a href="#">Licencias y pasaportes</a></li>
              <li><a href="#">Cédulas de residencia</a></li>
              <li><a href="#">Firmador Electrónico</a></li>
              <li><a href="#">Firma Digital</a></li>
              <li><a href="#">Transacciones</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-bcr">
          <div className="social-icons">
            <div className="social-circle">f</div>
            <div className="social-circle">ig</div>
            <div className="social-circle">in</div>
            <div className="social-circle">yt</div>
            <div className="social-circle">tk</div>
          </div>
          <p className="copyright">© Banco de Costa Rica 2026 | Privacidad</p>
        </div>
      </div>
    </footer>
  );
};

export default PiePagina;
