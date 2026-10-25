const image = (label, background = '111827') =>
  `https://placehold.co/640x420/${background}/39ff14?text=${encodeURIComponent(label)}`;

export const products = [
  {
    id: 1,
    name: 'PlayStation 5',
    category: 'Consolas',
    price: 750990,
    description: 'Consola PlayStation 5 de 512 GB, versión con disco.',
    image: 'https://http2.mlstatic.com/D_NQ_NP_781313-MLA99856414215_112025-O.webp'
  },
  {
    id: 2,
    name: 'Xbox Series X',
    category: 'Consolas',
    price: 675990,
    description: 'Consola Xbox Series X de 1 TB para jugar en 4K.',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSyBEd4DuZutFqqOUok_fIY9xUUrTHcBgX3B-ce02kgCpMldWEVlI_8MflEX7Vyq152uYAbteQxbiWRAfHaSopKVNluWo7E',
  },
  {
    id: 3,
    name: 'Nintendo Switch 2',
    category: 'Consolas',
    price: 450990,
    description: 'Consola híbrida Nintendo Switch 2 con 512 GB.',
    image: 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/1/_/1_1745414561000.jpg',
  },
  {
    id: 4,
    name: 'Mouse Logitech G502',
    category: 'Accesorios',
    price: 84990,
    description: 'Mouse inalámbrico gamer con sensor de alta precisión.',
    image: 'https://static.myshop.cl/myshop/fotos/1/2/3/5/4/1_1774235427000.png',
  },
  {
    id: 5,
    name: 'Silla Gamer GX2000',
    category: 'Mobiliario',
    price: 164990,
    description: 'Silla ergonómica con soporte lumbar y reposabrazos ajustables.',
    image: 'https://lubabycas.cl/cdn/shop/files/8eaec2e7-cd21-4821-9f03-e8da453ff6ee-negro-75afcbd8-c959-4a44-a942-6efcda0d48df.jpg?v=1778799864&width=1600',
  },
  {
    id: 6,
    name: 'Tarjeta gráfica RTX 5090',
    category: 'Componentes',
    price: 4549990,
    description: 'Tarjeta de video NVIDIA para equipos de alto rendimiento.',
    image: 'https://api.solotodo.com/products/265691/picture/?width=400&height=400',
  },
  {
    id: 7,
    name: 'Monitor Samsung G5',
    category: 'Periféricos',
    price: 329990,
    description: 'Monitor curvo de 34 pulgadas con frecuencia de 165 Hz.',
    image: 'https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/e978782a-30c3-43cc-9644-fdad5ae3b8d9/MKQWUU2NC8/MKQWUU2NC8-1/1722963038806-MKQWUU2NC8-1-1.jpg',
  },
  {
    id: 8,
    name: 'Steam Deck OLED',
    category: 'Consolas',
    price: 699990,
    description: 'Consola portátil Steam Deck OLED de 512 GB.',
    image: 'https://m.media-amazon.com/images/I/71JEmdyt-UL.jpg',
  },
  {
    id: 9,
    name: 'Teclado HyperX Alloy Origins',
    category: 'Accesorios',
    price: 89990,
    description: 'Teclado mecánico RGB con switches para gaming competitivo.',
    image: 'https://cdnx.jumpseller.com/fantech-esports/image/39087135/thumb/960/960?1754504474',
  },
  {
    id: 10,
    name: 'Audífonos Razer Kraken',
    category: 'Accesorios',
    price: 129990,
    description: 'Audífonos gaming 7.1 con micrófono retráctil.',
    image: 'https://media.spdigital.cl/thumbnails/products/1752783816584-MC4_69fec481_thumbnail_512.jpg',
  },
  {
    id: 11,
    name: 'Mando inalámbrico',
    category: 'Accesorios',
    price: 59990,
    description: 'Control inalámbrico compatible con PC y consolas.',
    image: 'https://afel.cl/cdn/shop/files/stock_pictures2F27372FS07_black.jpg?v=1720899858',
  },
  {
    id: 12,
    name: 'Polera Level-Up Edition',
    category: 'Merchandising',
    price: 19990,
    description: 'Polera oficial Level-Up para completar tu setup gamer.',
    image: image('Polera Level-Up', '111827'),
  },
];

export const categories = ['Todas', ...new Set(products.map((product) => product.category))];
