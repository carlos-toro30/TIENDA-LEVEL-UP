import { useEffect, useMemo, useState } from 'react';
import { products } from './data/products';
import { AdminDashboard } from './components/AdminDashboard';
import { CartView } from './components/CartView';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { RegisterForm } from './components/RegisterForm';
import {
  addToCart,
  getCartCount,
  readStorage,
  removeFromCart,
} from './utils/cart';

function HomePage({ onNavigate, onAdd }) {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <p className="eyebrow">Tu próxima partida comienza aquí</p>
              <h1>Equipa tu <span>universo gamer.</span></h1>
              <p className="hero-copy">Consolas, periféricos y componentes seleccionados para que cada partida se sienta como un nuevo nivel.</p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-success btn-lg" type="button" onClick={() => onNavigate('catalog')}>Explorar productos</button>
                <button className="btn btn-outline-light btn-lg" type="button" onClick={() => onNavigate('about')}>Conócenos</button>
              </div>
              <div className="hero-stats row g-3 mt-4">
                <div className="col-4"><strong>12+</strong><span>productos</span></div>
                <div className="col-4"><strong>24h</strong><span>despacho</span></div>
                <div className="col-4"><strong>100%</strong><span>gamer</span></div>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="hero-art" aria-label="Ilustración de setup gamer" role="img">
                <span className="hero-art-glow" />
                <span className="hero-console" aria-hidden="true">🎮</span>
                <span className="hero-art-label">LEVEL UP</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container page-section">
        <ProductGrid products={products.slice(0, 4)} onAdd={onAdd} />
        <div className="text-center mt-5">
          <button className="btn btn-outline-success" type="button" onClick={() => onNavigate('catalog')}>Ver catálogo completo →</button>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="container page-section narrow-content" aria-labelledby="about-title">
      <p className="eyebrow">Quiénes somos</p>
      <h2 id="about-title">Tecnología para jugar mejor</h2>
      <p className="lead text-secondary">Level-Up Gamer nace para reunir en un solo lugar hardware, accesorios y cultura gamer. Buscamos que cada persona pueda construir un setup que se adapte a su estilo y presupuesto.</p>
      <div className="row g-4 mt-2">
        <div className="col-12 col-md-4"><div className="info-card"><span className="info-icon">⚡</span><h3 className="h5">Curaduría</h3><p className="text-secondary mb-0">Seleccionamos productos con foco en rendimiento y experiencia.</p></div></div>
        <div className="col-12 col-md-4"><div className="info-card"><span className="info-icon">🛡️</span><h3 className="h5">Confianza</h3><p className="text-secondary mb-0">Información clara y soporte para decidir con seguridad.</p></div></div>
        <div className="col-12 col-md-4"><div className="info-card"><span className="info-icon">🚀</span><h3 className="h5">Comunidad</h3><p className="text-secondary mb-0">Compartimos novedades para que siempre estés actualizado.</p></div></div>
      </div>
    </section>
  );
}

function BlogPage({ onNavigate }) {
  const articles = [
    { title: 'Cómo elegir tu primer teclado mecánico', tag: 'Periféricos', text: 'Switches, formatos y recomendaciones para encontrar el teclado adecuado.' },
    { title: 'Cinco ideas para ordenar tu setup', tag: 'Setup', text: 'Pequeños cambios que mejoran la comodidad y el rendimiento de tu espacio.' },
    { title: 'Guía rápida para cuidar tu consola', tag: 'Consejos', text: 'Hábitos simples para mantener tus equipos listos para la próxima partida.' },
  ];

  return (
    <section className="container page-section" aria-labelledby="blog-title">
      <p className="eyebrow">Noticias y consejos</p>
      <h2 id="blog-title">Blog gamer</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
        {articles.map((article) => (
          <article className="col" key={article.title}>
            <div className="info-card h-100 d-flex flex-column">
              <span className="article-tag">{article.tag}</span>
              <h3 className="h5 mt-3">{article.title}</h3>
              <p className="text-secondary flex-grow-1">{article.text}</p>
              <button type="button" className="text-button text-start" onClick={() => onNavigate('contact')}>Quiero saber más →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState(() => readStorage('carrito-react', []));
  const [discountRate, setDiscountRate] = useState(() => readStorage('descuento-react', 0));
  const [user, setUser] = useState(() => readStorage('usuario-react', null));
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    localStorage.setItem('carrito-react', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('descuento-react', JSON.stringify(discountRate));
  }, [discountRate]);

  useEffect(() => {
    if (user) localStorage.setItem('usuario-react', JSON.stringify(user));
    else localStorage.removeItem('usuario-react');
  }, [user]);

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  const addProduct = (product) => {
    setCart((current) => addToCart(current, product));
    setNotice({ type: 'success', text: `${product.name} fue agregado al carrito.` });
  };

  const removeProduct = (productId) => {
    setCart((current) => removeFromCart(current, productId));
    setNotice({ type: 'info', text: 'Producto eliminado del carrito.' });
  };

  const applyCoupon = (rate) => {
    setDiscountRate(rate);
    setNotice({ type: 'success', text: 'Cupón aplicado correctamente.' });
  };

  const login = ({ email, password }) => {
    const users = readStorage('usuarios-react', []);
    const registeredUser = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);

    if (email.toLowerCase() === 'admin@levelup.cl' && password === 'admin123') {
      setUser({ name: 'Administrador', email, role: 'ADMIN' });
      setView('admin');
      setNotice({ type: 'success', text: 'Bienvenido al panel administrativo.' });
      return;
    }

    if (registeredUser || password.length >= 6) {
      setUser({ name: registeredUser?.name || 'Cliente Gamer', email, role: 'CLIENTE' });
      setView('home');
      setNotice({ type: 'success', text: 'Inicio de sesión exitoso.' });
      return;
    }

    setNotice({ type: 'danger', text: 'No pudimos validar tus credenciales.' });
  };

  const register = ({ name, email, password }) => {
    const users = readStorage('usuarios-react', []);
    if (users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
      setNotice({ type: 'danger', text: 'Ese correo ya está registrado.' });
      return;
    }

    const newUser = { name, email, password, role: 'CLIENTE' };
    localStorage.setItem('usuarios-react', JSON.stringify([...users, newUser]));
    setUser(newUser);
    setView('home');
    setNotice({ type: 'success', text: 'Cuenta creada correctamente.' });
  };

  const logout = () => {
    setUser(null);
    setView('home');
    setNotice({ type: 'info', text: 'Sesión cerrada.' });
  };

  const checkout = () => {
    if (!cart.length) {
      setNotice({ type: 'warning', text: 'Agrega productos antes de procesar la compra.' });
      return;
    }
    setCart([]);
    setDiscountRate(0);
    setView('home');
    setNotice({ type: 'success', text: 'Compra procesada. ¡Gracias por elegir Level-Up Gamer!' });
  };

  const content = (() => {
    switch (view) {
      case 'catalog': return <section className="container page-section"><ProductGrid products={products} onAdd={addProduct} /></section>;
      case 'cart': return <section className="container page-section"><CartView items={cart} discountRate={discountRate} onRemove={removeProduct} onApplyCoupon={applyCoupon} onCheckout={checkout} onNavigate={setView} /></section>;
      case 'login': return <section className="container page-section"><LoginForm onSubmit={login} onNavigate={setView} /></section>;
      case 'register': return <section className="container page-section"><RegisterForm onSubmit={register} onNavigate={setView} /></section>;
      case 'contact': return <section className="container page-section"><ContactForm onSubmit={() => setNotice({ type: 'success', text: 'Mensaje recibido correctamente.' })} /></section>;
      case 'about': return <AboutPage />;
      case 'blog': return <BlogPage onNavigate={setView} />;
      case 'admin': return user?.role === 'ADMIN'
        ? <section className="container page-section"><AdminDashboard productCount={products.length} user={user} onNavigate={setView} /></section>
        : <section className="container page-section"><LoginForm onSubmit={login} onNavigate={setView} /></section>;
      case 'home':
      default:
        return <HomePage onNavigate={setView} onAdd={addProduct} />;
    }
  })();

  return (
    <div className="app-shell">
      <Navbar view={view} cartCount={cartCount} user={user} onNavigate={setView} onLogout={logout} />
      {notice ? (
        <div className="container notice-container">
          <div className={`alert alert-${notice.type} alert-dismissible fade show`} role="alert">
            {notice.text}
            <button type="button" className="btn-close" aria-label="Cerrar aviso" onClick={() => setNotice(null)} />
          </div>
        </div>
      ) : null}
      <main>{content}</main>
      <Footer onNavigate={setView} />
    </div>
  );
}
