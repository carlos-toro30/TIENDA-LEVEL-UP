import { formatPrice } from '../utils/cart';

export function ProductCard({ product, onAdd }) {
  return (
    <article className="card product-card h-100">
      <div className="product-image-wrapper">
        <img className="card-img-top product-image" src={product.image} alt={product.name} loading="lazy" />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title">{product.name}</h3>
        <p className="card-text text-secondary flex-grow-1">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center gap-2 mt-3">
          <strong className="product-price">{formatPrice(product.price)}</strong>
          <button
            className="btn btn-success"
            type="button"
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={() => onAdd(product)}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
