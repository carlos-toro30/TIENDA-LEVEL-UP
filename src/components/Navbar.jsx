const navigation = [
  { id: 'home', label: 'Inicio' },
  { id: 'catalog', label: 'Productos' },
  { id: 'about', label: 'Nosotros' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contacto' },
];

export function Navbar({ view, cartCount, user, onNavigate, onLogout }) {
  const navigate = (event, destination) => {
    event.preventDefault();
    onNavigate(destination);
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand brand-mark" href="#home" onClick={(event) => navigate(event, 'home')}>
            <span className="brand-icon" aria-hidden="true">👾</span> Level-Up Gamer
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-navigation"
            aria-controls="main-navigation"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="main-navigation">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {navigation.map((item) => (
                <li className="nav-item" key={item.id}>
                  <a
                    className={`nav-link ${view === item.id ? 'active' : ''}`}
                    href={`#${item.id}`}
                    aria-current={view === item.id ? 'page' : undefined}
                    onClick={(event) => navigate(event, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="d-flex flex-wrap align-items-center gap-2">
              {user ? (
                <span className="user-badge" title={`Sesión de ${user.email}`}>
                  <span aria-hidden="true">●</span> {user.name}
                </span>
              ) : null}
              <button className="btn btn-outline-light btn-sm" type="button" onClick={() => onNavigate('cart')}>
                🛒 Carrito <span className="badge text-bg-success">{cartCount}</span>
              </button>
              {user ? (
                <button className="btn btn-link nav-action" type="button" onClick={onLogout}>
                  Cerrar sesión
                </button>
              ) : (
                <button className="btn btn-success btn-sm" type="button" onClick={() => onNavigate('login')}>
                  Iniciar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
