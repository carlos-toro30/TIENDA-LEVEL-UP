import { useState } from 'react';

export function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Ingresa tu nombre.';
    if (!form.email.trim()) nextErrors.email = 'Ingresa tu correo.';
    if (form.message.trim().length < 10) nextErrors.message = 'Escribe un mensaje de al menos 10 caracteres.';
    setErrors(nextErrors);

    if (!Object.keys(nextErrors).length) {
      onSubmit(form);
      setStatus('Mensaje enviado. Te responderemos pronto.');
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <section className="form-section narrow-section" aria-labelledby="contact-title">
      <div className="form-card">
        <p className="eyebrow">Estamos para ayudarte</p>
        <h2 id="contact-title">Contacto</h2>
        <form onSubmit={submit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="contact-name">Nombre</label>
            <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="contact-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            {errors.name ? <div className="invalid-feedback">{errors.name}</div> : null}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="contact-email">Correo electrónico</label>
            <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="contact-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="contact-message">Mensaje</label>
            <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} id="contact-message" rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            {errors.message ? <div className="invalid-feedback">{errors.message}</div> : null}
          </div>
          <button className="btn btn-success w-100" type="submit">Enviar mensaje</button>
          {status ? <p className="success-message" role="status">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
