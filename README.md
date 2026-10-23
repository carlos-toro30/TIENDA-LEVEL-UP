# Level-Up Gamer

Aplicación frontend para una tienda gamer, migrada a React y Bootstrap para cumplir la rúbrica de desarrollo frontend y pruebas unitarias.

## Tecnologías

- React 18 con Vite.
- Bootstrap 5 para grillas, formularios, navegación y diseño responsive.
- Jasmine y Karma para pruebas unitarias de lógica y componentes React.
- Karma Coverage para medir statements, branches, functions y lines.
- `localStorage` para conservar carrito, sesión y usuarios de demostración.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Luego abre la URL que indique Vite, normalmente `http://localhost:5173`.

También puedes comprobar la compilación de producción:

```bash
npm run build
```

## Pruebas

```bash
npm test
```

La suite contiene 16 pruebas Jasmine: 8 pruebas para la lógica del carrito y 8 pruebas de interacción de componentes React. Karma ejecuta las pruebas en Chrome Headless; en Windows, si Chrome no está instalado, la configuración usa Microsoft Edge automáticamente cuando está disponible.

Para generar el reporte HTML de cobertura:

```bash
npm run coverage
```

El reporte queda en `coverage/` y permite analizar la cobertura del código probado.

## Arquitectura React

La aplicación principal está en `src/App.jsx`. El estado global de la tienda se mantiene en `App` y se comunica mediante props:

- `Navbar` recibe la vista, usuario y cantidad del carrito.
- `ProductGrid` administra búsqueda y filtro con `useState` y recibe productos mediante props.
- `ProductCard` recibe un producto y una función `onAdd`.
- `CartView` recibe los productos, descuento y callbacks para eliminar, aplicar cupones y procesar la compra.
- `LoginForm`, `RegisterForm` y `ContactForm` administran formularios controlados con estado React.
- `AdminDashboard` se muestra según el estado de sesión del usuario.

El carrito usa funciones puras en `src/utils/cart.js`, lo que facilita probar cantidades, eliminación, descuentos y totales sin depender del navegador.

## Evidencias para la presentación

Para la exposición se recomienda mostrar:

1. La grilla de productos en escritorio y móvil.
2. El uso de props entre `ProductGrid` y `ProductCard`.
3. El cambio de estado al agregar productos y aplicar un cupón.
4. La validación de login y registro.
5. La ejecución de `npm test` con las 16 pruebas exitosas.
6. El resumen de cobertura generado por Karma.

## Acceso de demostración

- Administrador: `admin@levelup.cl`
- Contraseña: `admin123`
- Cupón: `LEVELUP10`

Las credenciales son únicamente demostrativas y no deben utilizarse en un sistema real.
