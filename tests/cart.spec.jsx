import {
  addToCart,
  formatPrice,
  getCartCount,
  getCouponRate,
  getSubtotal,
  getTotal,
  readStorage,
  removeFromCart,
} from '../src/utils/cart';

const product = { id: 1, name: 'Producto de prueba', price: 10000 };

describe('Funciones del carrito', () => {
  it('agrega un producto nuevo con cantidad uno', () => {
    expect(addToCart([], product)).toEqual([{ ...product, quantity: 1 }]);
  });

  it('incrementa la cantidad cuando el producto ya existe', () => {
    const cart = [{ ...product, quantity: 2 }];
    expect(addToCart(cart, product)[0].quantity).toBe(3);
  });

  it('elimina el producto solicitado sin mutar el carrito original', () => {
    const cart = [{ ...product, quantity: 1 }, { id: 2, name: 'Otro', price: 5000, quantity: 1 }];
    const result = removeFromCart(cart, product.id);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
    expect(cart.length).toBe(2);
  });

  it('calcula la cantidad total de unidades', () => {
    expect(getCartCount([{ ...product, quantity: 2 }, { id: 2, price: 5000, quantity: 3 }])).toBe(5);
  });

  it('calcula subtotal y total con descuento', () => {
    const cart = [{ ...product, quantity: 2 }];
    expect(getSubtotal(cart)).toBe(20000);
    expect(getTotal(cart, 0.1)).toBe(18000);
  });

  it('reconoce el cupón válido e ignora códigos inválidos', () => {
    expect(getCouponRate(' levelup10 ')).toBe(0.1);
    expect(getCouponRate('OTRO-CUPON')).toBe(0);
  });

  it('formatea precios en pesos chilenos', () => {
    expect(formatPrice(750990)).toBe('$750.990');
  });

  it('devuelve el valor alternativo cuando localStorage contiene JSON inválido', () => {
    localStorage.setItem('invalid-json', '{no es json');
    expect(readStorage('invalid-json', [])).toEqual([]);
    localStorage.removeItem('invalid-json');
  });
});
