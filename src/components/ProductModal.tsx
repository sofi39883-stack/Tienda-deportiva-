import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { formatCop } from '../data/catalogData';
import { CatalogProduct, ColorSwatch } from '../types/catalog';
import { BotanicalDivider } from './BotanicalFlourish';

interface ProductModalProps {
  product: CatalogProduct | null;
  initialColor: ColorSwatch | null;
  onClose: () => void;
  onUpdateProduct: (id: string, patch: Partial<CatalogProduct>) => void;
  onAddToSelection: (product: CatalogProduct, color: ColorSwatch, size: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  initialColor,
  onClose,
  onUpdateProduct,
  onAddToSelection,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(initialColor || product.colors[0]);
      setSelectedSize(product.sizes[1] || product.sizes[0]);
      setAddedFeedback(false);
    }
  }, [product, initialColor]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeColor = selectedColor || product.colors[0];
  const formattedPrice = formatCop(product.priceCop);

  const handlePriceInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) {
      onUpdateProduct(product.id, { priceCop: null });
      return;
    }
    const parsed = parseInt(digits, 10);
    onUpdateProduct(product.id, { priceCop: Number.isNaN(parsed) ? null : parsed });
  };

  const handleAdd = () => {
    onAddToSelection(product, activeColor, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3A2B2C]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FCF9F7] border border-[#C6A467]/35 shadow-2xl grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle de prenda"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 border border-[#C6A467]/35 text-[#3A2B2C] hover:bg-[#EBD5D5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Full Product Photography */}
        <div className="md:col-span-6 bg-[#F7F1EB] aspect-[3/4] md:aspect-auto md:h-full">
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Right: Contiguous Product Details & Editable Price/Ref */}
        <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#9B646A] font-medium mb-2">
              {product.category}
            </p>
            <h2
              id="modal-product-title"
              className="font-serif text-3xl font-medium text-[#3A2B2C] leading-tight mb-3"
            >
              {product.name}
            </h2>

            <p className="text-sm leading-relaxed text-[#5C4748] mb-3">
              {product.shortDescription}
            </p>
            <p className="text-xs text-[#6E5859] mb-6">{product.fabricNote}</p>

            <BotanicalDivider className="my-5 justify-start" />

            {/* Editable Reference & Price COP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-white border border-[#C6A467]/25">
              <div>
                <label
                  htmlFor="modal-ref-input"
                  className="block text-[11px] uppercase tracking-[0.12em] text-[#6E5859] mb-1"
                >
                  Referencia
                </label>
                <input
                  id="modal-ref-input"
                  type="text"
                  value={product.reference}
                  onChange={(e) => onUpdateProduct(product.id, { reference: e.target.value })}
                  placeholder="Agregar referencia..."
                  className="w-full text-sm text-[#3A2B2C] bg-[#FCF9F7] border border-[#C6A467]/40 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#B57C82]"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-price-input"
                  className="block text-[11px] uppercase tracking-[0.12em] text-[#6E5859] mb-1"
                >
                  Precio (COP)
                </label>
                <input
                  id="modal-price-input"
                  type="text"
                  inputMode="numeric"
                  value={product.priceCop ? product.priceCop.toString() : ''}
                  onChange={(e) => handlePriceInput(e.target.value)}
                  placeholder="Ej: 135000"
                  className="w-full text-sm font-medium tabular-nums text-[#3A2B2C] bg-[#FCF9F7] border border-[#C6A467]/40 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#B57C82]"
                />
                <span className="block text-[11px] text-[#6E5859] mt-1 tabular-nums">
                  {formattedPrice || 'Espacio editable sin precio fijo'}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-5">
              <p className="text-xs text-[#6E5859] mb-2">
                Color seleccionado:{' '}
                <span className="font-medium text-[#3A2B2C]">{activeColor.name}</span>
              </p>
              <div className="flex items-center gap-2.5">
                {product.colors.map((swatch) => {
                  const active = swatch.id === activeColor.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedColor(swatch)}
                      aria-label={swatch.name}
                      title={swatch.name}
                      className={`w-6 h-6 rounded-full border transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B57C82] ${
                        active
                          ? 'scale-110 ring-1 ring-offset-2 ring-[#C6A467] border-[#3A2B2C]/30'
                          : 'border-[#3A2B2C]/15 hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-7">
              <p className="text-xs text-[#6E5859] mb-2">Talla</p>
              <div className="flex items-center gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                      selectedSize === size
                        ? 'bg-[#B57C82] text-white border-[#B57C82]'
                        : 'bg-white text-[#3A2B2C] border-[#C6A467]/35 hover:border-[#B57C82]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-widest text-white bg-[#B57C82] hover:bg-[#9B646A] transition-colors rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B57C82]"
          >
            {addedFeedback ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Agregado a tu selección</span>
              </>
            ) : (
              <span>Agregar a selección</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
