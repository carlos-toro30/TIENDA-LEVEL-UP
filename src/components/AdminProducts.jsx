import { useState } from 'react';

const emptyProduct = { name: '', description: '', category: 'Accesorios', price: '', image: '' };

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(product || emptyProduct);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, price: Number(form.price), image: form.image || `https://placehold.co/640x420/111827/39ff14?text=${encodeURIComponent(form.name)}` });
  };
  return <form className="admin-form" onSubmit={submit}>
    <h3>{product ? 'Editar producto' : 'Registrar producto'}</h3>
    <label>Nombre del producto<input required value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
    <label>Descripción<textarea required value={form.description} onChange={(e) => update('description', e.target.value)} /></label>
    <label>Categoría<input required value={form.category} onChange={(e) => update('category', e.target.value)} /></label>
    <label>Precio<input required min="0" type="number" value={form.price} onChange={(e) => update('price', e.target.value)} /></label>
    <label>Imagen (URL)<input value={form.image} onChange={(e) => update('image', e.target.value)} /></label>
    <div className="admin-form-actions"><button className="admin-primary" type="submit">{product ? 'Guardar cambios' : 'Registrar producto'}</button><button type="button" onClick={onCancel}>Cancelar</button></div>
  </form>;
}

export function AdminProducts({ products, mode, onAdd, onUpdate, onDelete, onModeChange }) {
  const [editingProduct, setEditingProduct] = useState(null);
  if (mode === 'new') return <section className="admin-management"><h2>Nuevo producto</h2><p>Registra un producto en el catálogo.</p><ProductForm onSave={(product) => { onAdd(product); onModeChange('list'); }} onCancel={() => onModeChange('list')} /></section>;
  if (editingProduct) return <section className="admin-management"><h2>Editar producto</h2><p>Modifica la información del producto seleccionado.</p><ProductForm product={editingProduct} onSave={(product) => { onUpdate(product); setEditingProduct(null); }} onCancel={() => setEditingProduct(null)} /></section>;
  return <section className="admin-management"><div className="management-heading"><div><h2>{mode === 'edit' ? 'Editar productos' : 'Mostrar productos'}</h2><p>{mode === 'edit' ? 'Selecciona un producto para editarlo.' : 'Productos registrados en la tienda.'}</p></div><button className="admin-primary" type="button" onClick={() => onModeChange('new')}>Nuevo producto</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>{mode === 'edit' ? 'Acciones' : 'Estado'}</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{product.category}</td><td>${product.price.toLocaleString('es-CL')}</td><td>{mode === 'edit' ? <><button type="button" onClick={() => setEditingProduct(product)}>Editar</button><button type="button" onClick={() => onDelete(product.id)}>Eliminar</button></> : <span className="admin-status">Publicado</span>}</td></tr>)}</tbody></table></div></section>;
}
