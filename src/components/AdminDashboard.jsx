export function AdminDashboard({ productCount, user, onNavigate }) {
  return (
    <section className="admin-section" aria-labelledby="admin-title">
      <div className="section-heading d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <p className="eyebrow">Panel privado</p>
          <h2 id="admin-title">Dashboard administrativo</h2>
          <p className="text-secondary mb-0">Sesión activa: {user?.email}</p>
        </div>
        <button className="btn btn-outline-light align-self-start" type="button" onClick={() => onNavigate('catalog')}>
          Volver a la tienda
        </button>
      </div>
      <div className="row g-4">
        <div className="col-12 col-md-4"><div className="metric-card"><span>Productos publicados</span><strong>{productCount}</strong></div></div>
        <div className="col-12 col-md-4"><div className="metric-card"><span>Pedidos del mes</span><strong>24</strong></div></div>
        <div className="col-12 col-md-4"><div className="metric-card"><span>Usuarios activos</span><strong>128</strong></div></div>
      </div>
      <div className="admin-note mt-4">
        <h3 className="h5">Componentes administrativos</h3>
        <p className="mb-0 text-secondary">Este panel demuestra una vista protegida por el estado de sesión y mantiene la arquitectura de componentes React.</p>
      </div>
    </section>
  );
}
