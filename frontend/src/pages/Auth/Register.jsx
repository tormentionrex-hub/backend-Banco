import { Link } from 'react-router-dom';
import logo from '../../images/Logo-BCR-Blanco-EDITABLE-CURVAS.png';
import './Auth.css';

const Register = () => {
  return (
    <div className="auth-page">
      {/* HEADER DE NAVEGACIÓN */}
      <nav className="auth-nav">
        <div className="auth-nav-left">
          <Link to="/">
            <img src={logo} alt="BCR Logo" className="auth-nav-logo" />
          </Link>
        </div>
        <div className="auth-nav-links">
          <Link to="/">Home</Link>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <Link to="/login" className="btn-nav-login">Login</Link>
        </div>
      </nav>

      <div className="auth-card">
        <Link to="/" className="close-btn">×</Link>
        <h2>Register</h2>
        <form className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>
          <button type="submit" className="btn-auth">Register</button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
