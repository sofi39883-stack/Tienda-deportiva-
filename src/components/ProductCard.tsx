import React, { useState } from 'react';
import { Eye, Pencil, Plus } from 'lucide-react';
import { formatCop } from '../data/catalogData';
import { CatalogProduct, ColorSwatch } from '../types/catalog';

interface ProductCardProps {
  product: CatalogProduct;
  isEditMode: boolean;
  onUpdateProduct: (id: string, patch: Partial<CatalogProduct>) => void;
  onOpenDetail: (product: CatalogProduct, selectedColor: ColorSwatch) => void;
  onQuickAdd: (product: CatalogProduct, selectedColor: ColorSwatch, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isEditMode,
  onUpdateProduct,
  onOpenDetail,
  onQuickAdd,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [imageError, setImageError] = useState(false);
  const [inlineEditingPrice, setInlineEditingPrice] = useState(false);
  const [inlineEditingRef, setInlineEditingRef] = useState(false);

  const formattedPrice = formatCop(product.priceCop);

  const handlePriceChange = (raw: string) => {
    const digitsOnly = raw.replace(/\D/g, '');
    if (!digitsOnly) {
      onUpdateProduct(product.id, { priceCop: null });
      return;
    }
    const parsed = parseInt(digitsOnly, 10);
    onUpdateProduct(product.id, { priceCop: Number.isNaN(parsed) ? null : parsed });
  };

  return (
    <article className="print-avoid-break group flex flex-col bg-white border border-[#C6A467]/25 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(92,71,72,0.16)]">
      {/* Image Frame (Uniform 3:4 Portrait Lookbook) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F1EB]">
        {!imageError ? (
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            onClick={() => onOpenDetail(product, selectedColor)}
            className="w-full h-full object-cover object-top cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F7F1EB] via-[#F2DCD8]/50 to-[#EBD5D5]">
            <span className="font-serif text-xl text-[#3A2B2C] mb-1">{product.name}</span>
            <span className="text-xs text-[#6E5859]">{product.category}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => onOpenDetail(product, selectedColor)}
          aria-label={`Ver detalles de ${product.name}`}
          className="no-print absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3A2B2C] bg-[#FCF9F7]/92 backdrop-blur-sm border border-[#C6A467]/35 rounded-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82]"
        >
          <Eye className="w-3.5 h-3.5 text-[#A68346]" aria-hidden="true" />
          <span>Ver prenda</span>
        </button>
      </div>

      {/* Product Metadata & Details */}
      <div className="flex-1 flex flex-col p-6">
        {/* Unboxed Metadata Line: Category · Reference */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E5859] mb-2">
          <span className="uppercase tracking-[0.12em] font-medium text-[#9B646A]">
            {product.category}
          </span>

          {isEditMode || inlineEditingRef ? (
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-[#6E5859]">Ref:</span>
              <input
                type="text"
                aria-label={`Referencia de ${product.name}`}
                value={product.reference}
                onChange={(e) => onUpdateProduct(product.id, { reference: e.target.value })}
                onBlur={() => setInlineEditingRef(false)}
                placeholder="Escribir ref."
                className="w-24 text-xs text-[#3A2B2C] bg-[#FCF9F7] border border-[#C6A467]/45 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#B57C82]"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setInlineEditingRef(true)}
              title="Haz clic para agregar referencia real"
              className="inline-flex items-center gap-1 text-xs text-[#6E5859] hover:text-[#3A2B2C] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B57C82] rounded"
            >
              <span>
                Ref:{' '}
                {product.reference ? (
                  <strong className="font-medium text-[#3A2B2C] tabular-nums">
                    {product.reference}
                  </strong>
                ) : (
                  <span className="border-b border-dashed border-[#C6A467]/70 pb-0.5 text-[#8A7374]">
                    ____________
                  </span>
                )}
              </span>
              <Pencil className="no-print w-2.5 h-2.5 text-[#C6A467]" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Garment Title */}
        <h3 className="font-serif text-[22px] leading-snug font-medium text-[#3A2B2C] mb-2">
          {product.name}
        </h3>

        {/* Short Description */}
        {isEditMode ? (
          <textarea
            aria-label={`Descripción de ${product.name}`}
            value={product.shortDescription}
            onChange={(e) => onUpdateProduct(product.id, { shortDescription: e.target.value })}
            rows={2}
            className="w-full text-[13px] leading-relaxed text-[#5C4748] bg-[#FCF9F7] border border-[#C6A467]/40 rounded px-2 py-1.5 mb-4 focus:outline-none focus:ring-1 focus:ring-[#B57C82]"
          />
        ) : (
          <p className="text-[13.5px] leading-relaxed text-[#5C4748] mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Color Swatches */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-[#6E5859] mb-2">
            <span>Tono: <span className="text-[#3A2B2C] font-medium">{selectedColor.name}</span></span>
            <span>Tallas: {product.sizes.join(' · ')}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2" role="radiogroup" aria-label={`Colores disponibles para ${product.name}`}>
              {product.colors.map((swatch) => {
                const isSelected = swatch.id === selectedColor.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={swatch.name}
                    title={swatch.name}
                    onClick={() => setSelectedColor(swatch)}
                    className={`w-5 h-5 rounded-full border transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B57C82] ${
                      isSelected
                        ? 'scale-110 ring-1 ring-offset-2 ring-[#C6A467] border-[#3A2B2C]/30'
                        : 'border-[#3A2B2C]/15 hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                );
              })}
            </div>

            {/* Clean Size Selector */}
            <div className="no-print flex items-center gap-1 text-[11px]">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSize === size
                      ? 'bg-[#EBD5D5]/70 text-[#3A2B2C] font-semibold'
                      : 'text-[#6E5859] hover:text-[#3A2B2C]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Hairline Divider + Editable COP Price + Add Action */}
        <div className="mt-auto pt-4 border-t border-[#C6A467]/20 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.14em] text-[#6E5859] mb-0.5">
              Precio COP
            </span>
            {isEditMode || inlineEditingPrice ? (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-[#3A2B2C]">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label={`Precio en pesos colombianos para ${product.name}`}
                  value={product.priceCop ? product.priceCop.toString() : ''}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  onBlur={() => setInlineEditingPrice(false)}
                  placeholder="Agregar COP"
                  className="w-28 text-sm font-semibold tabular-nums text-[#3A2B2C] bg-[#FCF9F7] border border-[#C6A467]/55 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#B57C82]"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setInlineEditingPrice(true)}
                title="Haz clic para ingresar el precio real en COP"
                className="inline-flex items-center gap-1.5 text-left cursor-pointer group/price focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B57C82] rounded"
              >
                {formattedPrice ? (
                  <span className="text-[15px] font-semibold tabular-nums text-[#3A2B2C]">
                    {formattedPrice}
                  </span>
                ) : (
                  <span className="text-[14px] tabular-nums text-[#6E5859] border-b border-dashed border-[#C6A467]/75 pb-0.5">
                    $ ____________ COP
                  </span>
                )}
                <Pencil
                  className="no-print w-3 h-3 text-[#C6A467] opacity-70 group-hover/price:opacity-100"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onQuickAdd(product, selectedColor, selectedSize)}
            className="no-print inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#3A2B2C] bg-[#F7F1EB] hover:bg-[#EBD5D5] border border-[#C6A467]/30 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82]"
          >
            <Plus className="w-3.5 h-3.5 text-[#9B646A]" aria-hidden="true" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  );
};
