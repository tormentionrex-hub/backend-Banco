import './DescargaApp.css';

const DescargaApp = () => {
  return (
    <section className="download-section">
      <div className="container download-content">
        <div className="text-side">
          <h2>Lleva Wise a donde vayas</h2>
          <p>Gestiona tu dinero sobre la marcha con nuestra app.</p>
          <div className="download-badges">
            <div className="badge-btn">
              <span>📱 App Store</span>
            </div>
            <div className="badge-btn">
              <span>▶ Google Play</span>
            </div>
          </div>
        </div>
        
        <div className="qr-side">
          <div className="qr-box">
            <span>QR</span>
          </div>
          <p>Escanea para descargar</p>
        </div>
      </div>
    </section>
  );
};

export default DescargaApp;
