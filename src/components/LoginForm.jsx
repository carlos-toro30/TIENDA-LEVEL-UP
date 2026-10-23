import { useState } from 'react';

const initialForm = { email: '', password: '' };

export function LoginForm({ onSubmit, onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.trim()) nextErrors.email = 'Ingresa tu correo electrónico.';
    if (form.password.length < 6) nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';

    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) onSubmit(form);
  };

  return (
    <section className="form-section narrow-section" aria-labelledby="login-title">
      <div className="form-card">
        <p className="eyebrow">Acceso seguro</p>
        <h2 id="login-title">Iniciar sesión</h2>
        <p className="text-secondary">Ingresa para revisar tu carrito y tus pedidos.</p>
        <form onSubmit={submit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-email">Correo electrónico</label>
            <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="login-email" name="email" type="email" value={form.email} onChange={updateField} />
            {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-password">Contraseña</label>
            <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="login-password" name="password" type="password" value={form.password} onChange={updateField} />
            {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
          </div>
          <button className="btn btn-success w-100" type="submit">Entrar</button>
        </form>
        <p className="form-footer-text">
          ¿No tienes cuenta? <button type="button" className="text-button" onClick={() => onNavigate('register')}>Regístrate aquí</button>
        </p>
      </div>
    </section>
  );
}
