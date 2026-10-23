import { useState } from 'react';
import { formatPrice, getCouponRate, getSubtotal, getTotal } from '../utils/cart';

export function CartView({ items, discountRate, onRemove, onApplyCoupon, onCheckout, onNavigate }) {
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = getSubtotal(items);
  const total = getTotal(items, discountRate);

  const applyCoupon = (event) => {
    event.preventDefault();
    const rate = getCouponRate(coupon);

    if (!rate) {
      setCouponMessage('Cupón no válido. Prueba con LEVELUP10.');
      return;
    }

    onApplyCoupon(rate);
    setCouponMessage('Cupón LEVELUP10 aplicado: tienes un 10% de descuento.');
  };

  return (
    <section className="cart-section" aria-labelledby="cart-title">
      <div className="section-heading">
        <p className="eyebrow">Tu selección</p>
        <h2 id="cart-title">Carrito de compras</h2>
      </div>

      {!items.length ? (
        <div className="empty-state text-center">
          <p className="mb-3">Tu carrito está vacío.</p>
          <button className="btn btn-success" type="button" onClick={() => onNavigate('catalog')}>
            Ir a la tienda
          </button>
        </div>
      ) : (
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-3">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="flex-grow-1">
                    <h3 className="h5 mb-1">{item.name}</h3>
                    <p className="text-secondary mb-1">{item.quantity} × {formatPrice(item.price)}</p>
                    <strong className="product-price">{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onRemove(item.id)}>
                    Eliminar
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <aside className="cart-summary">
              <h3 className="h5">Resumen del pedido</h3>
              <div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div className="summary-line"><span>Descuento</span><strong>{discountRate ? '-10%' : '—'}</strong></div>
              <hr />
              <div className="summary-line summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>

              <form className="coupon-form mt-4" onSubmit={applyCoupon}>
                <label htmlFor="coupon-input" className="form-label">Cupón de descuento</label>
                <div className="input-group">
                  <input
                    id="coupon-input"
                    className="form-control"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="LEVELUP10"
                  />
                  <button className="btn btn-outline-success" type="submit">Aplicar</button>
                </div>
                {couponMessage ? <p className="small mt-2 mb-0" role="status">{couponMessage}</p> : null}
              </form>

              <button className="btn btn-success w-100 mt-4" type="button" onClick={onCheckout}>
                Procesar compra
              </button>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}
