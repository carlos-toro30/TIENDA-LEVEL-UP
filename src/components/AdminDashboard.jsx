import { useState } from 'react';
import { AdminProducts } from './AdminProducts';
import { AdminUsers } from './AdminUsers';
import './AdminDashboard.css';

export function AdminDashboard({ products, users, onNavigate, onLogout, onAddProduct, onUpdateProduct, onDeleteProduct, onAddUser, onUpdateUser, onDeleteUser }) {
  const [section, setSection] = useState('dashboard');
  const go = (next) => setSection(next);
  const productMode = section.startsWith('products-') ? section.replace('products-', '') : null;
  const userMode = section.startsWith('users-') ? section.replace('users-', '') : null;

  return <section className="admin-dashboard" aria-label="Panel de administrador"><div className="admin-container">
    <aside className="sidebar"><div className="logo"><h2>Level-UP Gamer</h2><span>Administrador</span></div><nav className="menu" aria-label="Menú de administración">
      <button className={`menu-item ${section === 'dashboard' ? 'active' : ''}`} type="button" onClick={() => go('dashboard')}><i className="bi bi-house-door" aria-hidden="true" />Dashboard</button>
      <div className="menu-section"><p className="section-title"><i className="bi bi-box-seam" aria-hidden="true" />Productos</p><button type="button" onClick={() => go('products-new')}><i className="bi bi-plus-circle" aria-hidden="true" />Nuevo producto</button><button type="button" onClick={() => go('products-edit')}><i className="bi bi-pencil-square" aria-hidden="true" />Editar producto</button><button type="button" onClick={() => go('products-list')}><i className="bi bi-box-seam" aria-hidden="true" />Mostrar productos</button></div>
      <div className="menu-section"><p className="section-title"><i className="bi bi-people" aria-hidden="true" />Usuarios</p><button type="button" onClick={() => go('users-new')}><i className="bi bi-person-plus" aria-hidden="true" />Nuevo usuario</button><button type="button" onClick={() => go('users-edit')}><i className="bi bi-person-gear" aria-hidden="true" />Editar usuario</button><button type="button" onClick={() => go('users-list')}><i className="bi bi-person-lines-fill" aria-hidden="true" />Mostrar usuarios</button></div>
    </nav><div className="sidebar-bottom"><button type="button" onClick={onLogout}><i className="bi bi-box-arrow-left" aria-hidden="true" />Cerrar sesión</button></div></aside>
    <main className="main-content"><header className="header"><div><h1>¡Hola Administrador!</h1><p>Bienvenido al panel de administración.</p></div><div className="notification" aria-label="Notificaciones"><i className="bi bi-bell" aria-hidden="true" /></div></header>
      {section === 'dashboard' && <section className="dashboard"><h2>Resumen</h2><p className="descripcion">Desde este panel puedes administrar los productos y usuarios de la página.</p><div className="cards"><div className="card"><div className="card-icon"><i className="bi bi-box-seam" /></div><div><h3>Productos</h3><p>{products.length} productos registrados</p></div><button type="button" onClick={() => go('products-list')}>Ver productos →</button></div><div className="card"><div className="card-icon"><i className="bi bi-people" /></div><div><h3>Usuarios</h3><p>{users.length} usuarios registrados</p></div><button type="button" onClick={() => go('users-list')}>Ver usuarios →</button></div></div></section>}
      {productMode && <AdminProducts products={products} mode={productMode} onAdd={onAddProduct} onUpdate={onUpdateProduct} onDelete={onDeleteProduct} onModeChange={(mode) => go(`products-${mode}`)} />}
      {userMode && <AdminUsers users={users} mode={userMode} onAdd={onAddUser} onUpdate={onUpdateUser} onDelete={onDeleteUser} onModeChange={(mode) => go(`users-${mode}`)} />}
      {section !== 'dashboard' && <button className="admin-back" type="button" onClick={() => onNavigate('catalog')}>Volver a la tienda</button>}
    </main>
  </div></section>;
}
