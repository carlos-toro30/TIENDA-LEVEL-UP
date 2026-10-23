import { useState } from 'react';

const initialForm = { name: '', email: '', password: '', confirmPassword: '' };

export function RegisterForm({ onSubmit, onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Ingresa tu nombre.';
    if (!form.email.trim()) nextErrors.email = 'Ingresa tu correo electrónico.';
    if (form.password.length < 6) nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirma tu contraseña.';
    else if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Las contraseñas no coinciden.';

    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) onSubmit(form);
  };

  return (
    <section className="form-section narrow-section" aria-labelledby="register-title">
      <div className="form-card">
        <p className="eyebrow">Únete a la comunidad</p>
        <h2 id="register-title">Crear cuenta</h2>
        <form onSubmit={submit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="register-name">Nombre</label>
            <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="register-name" name="name" value={form.name} onChange={updateField} />
            {errors.name ? <div className="invalid-feedback">{errors.name}</div> : null}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="register-email">Correo electrónico</label>
            <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="register-email" name="email" type="email" value={form.email} onChange={updateField} />
            {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="register-password">Contraseña</label>
            <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="register-password" name="password" type="password" value={form.password} onChange={updateField} />
            {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="register-confirm-password">Confirmar contraseña</label>
            <input className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="register-confirm-password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} />
            {errors.confirmPassword ? <div className="invalid-feedback">{errors.confirmPassword}</div> : null}
          </div>
          <button className="btn btn-success w-100" type="submit">Registrarse</button>
        </form>
        <p className="form-footer-text">
          ¿Ya tienes cuenta? <button type="button" className="text-button" onClick={() => onNavigate('login')}>Inicia sesión</button>
        </p>
      </div>
    </section>
  );
}
