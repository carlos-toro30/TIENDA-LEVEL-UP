export function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div>
          <strong>Level-Up Gamer</strong>
          <p className="mb-0 text-secondary small">Desafía tus límites.</p>
        </div>
        <div className="footer-links d-flex flex-wrap justify-content-center gap-3">
          <button type="button" onClick={() => onNavigate('catalog')}>Productos</button>
          <button type="button" onClick={() => onNavigate('contact')}>Contacto</button>
          <button type="button" onClick={() => onNavigate('about')}>Equipo</button>
        </div>
        <span className="text-secondary small">© 2026 Level-Up Gamer</span>
      </div>
    </footer>
  );
}
