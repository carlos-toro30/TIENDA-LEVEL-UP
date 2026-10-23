export const COUPON_CODE = 'LEVELUP10';
export const COUPON_RATE = 0.1;

export function addToCart(cart, product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [...cart, { ...product, quantity: 1 }];
}

export function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

export function getCartCount(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getSubtotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getTotal(cart, discountRate = 0) {
  return Math.round(getSubtotal(cart) * (1 - discountRate));
}

export function getCouponRate(code) {
  return code.trim().toUpperCase() === COUPON_CODE ? COUPON_RATE : 0;
}

export function formatPrice(value) {
  return `$${value.toLocaleString('es-CL')}`;
}

export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
