import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { CartView } from '../src/components/CartView';
import { LoginForm } from '../src/components/LoginForm';
import { ProductCard } from '../src/components/ProductCard';
import { RegisterForm } from '../src/components/RegisterForm';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const product = {
  id: 1,
  name: 'PlayStation 5',
  category: 'Consolas',
  price: 750990,
  description: 'Consola de prueba',
  image: 'https://placehold.co/200x120',
};

let host;
let root;

function render(element) {
  act(() => root.render(element));
}

function updateInput(selector, value) {
  const input = host.querySelector(selector);
  const setter = Object.getOwnPropertyDescriptor(input.constructor.prototype, 'value').set;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

beforeEach(() => {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe('Componentes frontend React', () => {
  it('renderiza el nombre, precio y categoría del producto', () => {
    render(<ProductCard product={product} onAdd={() => {}} />);
    expect(host.querySelector('h3').textContent).toContain('PlayStation 5');
    expect(host.querySelector('.product-price').textContent).toBe('$750.990');
    expect(host.querySelector('.product-category').textContent).toBe('Consolas');
  });

  it('ejecuta la función recibida por props al agregar un producto', () => {
    const onAdd = jasmine.createSpy('onAdd');
    render(<ProductCard product={product} onAdd={onAdd} />);
    act(() => host.querySelector('button').click());
    expect(onAdd).toHaveBeenCalledWith(product);
  });

  it('muestra errores cuando se envía el login vacío', () => {
    render(<LoginForm onSubmit={() => {}} onNavigate={() => {}} />);
    act(() => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(host.querySelector('.invalid-feedback').textContent).toContain('correo');
    expect(host.querySelectorAll('.invalid-feedback').length).toBe(2);
  });

  it('envía las credenciales válidas del login mediante props', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<LoginForm onSubmit={onSubmit} onNavigate={() => {}} />);
    updateInput('#login-email', 'gamer@example.com');
    updateInput('#login-password', '123456');
    act(() => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'gamer@example.com', password: '123456' });
  });

  it('valida que el registro tenga una contraseña confirmada', () => {
    render(<RegisterForm onSubmit={() => {}} onNavigate={() => {}} />);
    act(() => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(host.querySelectorAll('.invalid-feedback').length).toBe(4);
  });

  it('envía el formulario de registro válido', () => {
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<RegisterForm onSubmit={onSubmit} onNavigate={() => {}} />);
    updateInput('#register-name', 'Player One');
    updateInput('#register-email', 'player@example.com');
    updateInput('#register-password', '123456');
    updateInput('#register-confirm-password', '123456');
    act(() => host.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Player One', email: 'player@example.com', password: '123456', confirmPassword: '123456' });
  });

  it('renderiza el estado vacío del carrito y permite volver al catálogo', () => {
    const onNavigate = jasmine.createSpy('onNavigate');
    render(<CartView items={[]} discountRate={0} onRemove={() => {}} onApplyCoupon={() => {}} onCheckout={() => {}} onNavigate={onNavigate} />);
    expect(host.textContent).toContain('Tu carrito está vacío');
    act(() => host.querySelector('button').click());
    expect(onNavigate).toHaveBeenCalledWith('catalog');
  });

  it('aplica un cupón válido desde el DOM del carrito', () => {
    const onApplyCoupon = jasmine.createSpy('onApplyCoupon');
    render(<CartView items={[{ ...product, quantity: 1 }]} discountRate={0} onRemove={() => {}} onApplyCoupon={onApplyCoupon} onCheckout={() => {}} onNavigate={() => {}} />);
    updateInput('#coupon-input', 'LEVELUP10');
    act(() => host.querySelector('.coupon-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    expect(onApplyCoupon).toHaveBeenCalledWith(0.1);
    expect(host.textContent).toContain('Cupón LEVELUP10 aplicado');
  });
});
