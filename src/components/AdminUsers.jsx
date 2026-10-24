import { useState } from 'react';

const emptyUser = { name: '', email: '', password: '', role: 'CLIENTE' };

function UserForm({ user, onSave, onCancel }) {
  const [form, setForm] = useState(user || emptyUser);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event) => { event.preventDefault(); onSave(form); };
  return <form className="admin-form" onSubmit={submit}>
    <h3>{user ? 'Editar usuario' : 'Registrar usuario'}</h3>
    <label>Nombre completo<input required value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
    <label>Correo electrónico<input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></label>
    <label>Contraseña<input required={!user} type="password" value={form.password} onChange={(e) => update('password', e.target.value)} /></label>
    <label>Rol<select value={form.role} onChange={(e) => update('role', e.target.value)}><option value="CLIENTE">Cliente</option><option value="ADMIN">Administrador</option></select></label>
    <div className="admin-form-actions"><button className="admin-primary" type="submit">{user ? 'Guardar cambios' : 'Registrar usuario'}</button><button type="button" onClick={onCancel}>Cancelar</button></div>
  </form>;
}

export function AdminUsers({ users, mode, onAdd, onUpdate, onDelete, onModeChange }) {
  const [editingUser, setEditingUser] = useState(null);
  if (mode === 'new') return <section className="admin-management"><h2>Nuevo usuario</h2><p>Registra un usuario en el sistema.</p><UserForm onSave={(user) => { onAdd(user); onModeChange('list'); }} onCancel={() => onModeChange('list')} /></section>;
  if (editingUser) return <section className="admin-management"><h2>Editar usuario</h2><p>Modifica la información del usuario seleccionado.</p><UserForm user={editingUser} onSave={(user) => { onUpdate(user); setEditingUser(null); }} onCancel={() => setEditingUser(null)} /></section>;
  return <section className="admin-management"><div className="management-heading"><div><h2>{mode === 'edit' ? 'Editar usuarios' : 'Mostrar usuarios'}</h2><p>{mode === 'edit' ? 'Selecciona un usuario para editarlo.' : 'Usuarios registrados en la tienda.'}</p></div><button className="admin-primary" type="button" onClick={() => onModeChange('new')}>Nuevo usuario</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>{mode === 'edit' ? 'Acciones' : 'Estado'}</th></tr></thead><tbody>{users.map((user) => <tr key={user.id || user.email}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>{mode === 'edit' ? <><button type="button" onClick={() => setEditingUser({ ...user, password: '' })}>Editar</button><button type="button" onClick={() => onDelete(user.id || user.email)}>Eliminar</button></> : <span className="admin-status">Activo</span>}</td></tr>)}</tbody></table></div></section>;
}
