import { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, onAdd }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const categories = ['Todas', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === 'Todas' || product.category === category;
      const matchesSearch = !normalizedSearch
        || `${product.name} ${product.description}`.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  return (
    <section aria-labelledby="catalog-title">
      <div className="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3">
        <div>
          <p className="eyebrow">Catálogo seleccionado</p>
          <h2 id="catalog-title">Productos para subir de nivel</h2>
        </div>
        <div className="catalog-filters row g-2" aria-label="Filtros del catálogo">
          <div className="col-12 col-sm-7">
            <label className="visually-hidden" htmlFor="product-search">Buscar productos</label>
            <input
              id="product-search"
              className="form-control"
              type="search"
              placeholder="Buscar producto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-12 col-sm-5">
            <label className="visually-hidden" htmlFor="product-category">Filtrar por categoría</label>
            <select
              id="product-category"
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} onAdd={onAdd} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          No encontramos productos con esos filtros.
        </div>
      )}
    </section>
  );
}
