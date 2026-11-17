import React, { useState } from 'react';
import { Check, Copy, Minus, Plus, Trash2, X } from 'lucide-react';
import { formatCop } from '../data/catalogData';
import { CatalogProduct, SelectionItem } from '../types/catalog';

interface SelectionDrawerProps {
  isOpen: boolean;
  storeName: string;
  items: SelectionItem[];
  products: CatalogProduct[];
  onClose: () => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearSelection: () => void;
}

export const SelectionDrawer: React.FC<SelectionDrawerProps> = ({
  isOpen,
  storeName,
  items,
  products,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearSelection,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const enriched = items
    .map((item, index) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product, index } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const knownSubtotal = enriched.reduce((acc, entry) => {
    if (entry.product.priceCop && entry.product.priceCop > 0) {
      return acc + entry.product.priceCop * entry.quantity;
    }
    return acc;
  }, 0);

  const hasUndefinedPrices = enriched.some(
    (entry) => entry.product.priceCop === null || entry.product.priceCop <= 0
  );

  const handleCopySummary = async () => {
    const lines = enriched.map((entry) => {
      const refText = entry.product.reference ? ` (Ref: ${entry.product.reference})` : '';
      const priceText = formatCop(entry.product.priceCop) || 'Precio por definir';
      return `• ${entry.quantity}x ${entry.product.name}${refText} — Color: ${entry.colorName}, Talla: ${entry.size} — ${priceText}`;
    });
    const footer =
      knownSubtotal > 0
        ? `\nSubtotal estimado: ${formatCop(knownSubtotal)}${hasUndefinedPrices ? ' (+ prendas por cotizar)' : ''}`
        : '\nPrecios por confirmar.';

    const text = `Selección de Catálogo — ${storeName}\n\n${lines.join('\n')}${footer}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // fallback below
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end bg-[#3A2B2C]/35 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Selección de prendas"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#FCF9F7] border-l border-[#C6A467]/30 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#C6A467]/25 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#3A2B2C]">
              Tu Selección
            </h2>
            <p className="text-xs text-[#6E5859]">
              Prendas elegidas para cotización o pedido
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar selección"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EBD5D5]/60 text-[#3A2B2C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {enriched.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-xl text-[#3A2B2C] mb-2">
                Aún no has agregado prendas
              </p>
              <p className="text-xs text-[#6E5859] max-w-xs mx-auto leading-relaxed">
                Explora el catálogo, elige tu tono y talla favorita y presiona Agregar para armar tu lista.
              </p>
            </div>
          ) : (
            enriched.map((entry) => {
              const unitPrice = formatCop(entry.product.priceCop);
              return (
                <div
                  key={`${entry.productId}-${entry.colorName}-${entry.size}`}
                  className="flex gap-4 pb-5 border-b border-[#C6A467]/20"
                >
                  <img
                    src={entry.product.imageUrl}
                    alt={entry.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-26 object-cover object-top bg-[#F7F1EB] border border-[#C6A467]/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-medium text-[#3A2B2C] leading-snug">
                        {entry.product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(entry.index)}
                        aria-label={`Quitar ${entry.product.name}`}
                        className="text-[#6E5859] hover:text-[#9B646A] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#6E5859] mt-0.5">
                      {entry.colorName} · Talla {entry.size}
                      {entry.product.reference ? ` · Ref: ${entry.product.reference}` : ''}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#C6A467]/35 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(entry.index, -1)}
                          aria-label="Disminuir cantidad"
                          className="px-2 py-1 text-[#3A2B2C] hover:bg-[#F7F1EB] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium tabular-nums">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(entry.index, 1)}
                          aria-label="Aumentar cantidad"
                          className="px-2 py-1 text-[#3A2B2C] hover:bg-[#F7F1EB] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold tabular-nums text-[#3A2B2C]">
                        {unitPrice || 'Precio por definir'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {enriched.length > 0 && (
          <div className="p-6 bg-[#F7F1EB] border-t border-[#C6A467]/25 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-[#6E5859]">
                Subtotal (COP)
              </span>
              <span className="text-base font-semibold tabular-nums text-[#3A2B2C]">
                {knownSubtotal > 0 ? formatCop(knownSubtotal) : 'Por definir'}
              </span>
            </div>
            {hasUndefinedPrices && (
              <p className="text-[11px] text-[#6E5859]">
                Algunas prendas aún tienen el espacio de precio en blanco.
              </p>
            )}

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#B57C82] hover:bg-[#9B646A] transition-colors rounded-md cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Resumen copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copiar lista de pedido</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClearSelection}
                className="w-full py-2 text-xs text-[#6E5859] hover:text-[#3A2B2C] transition-colors cursor-pointer"
              >
                Vaciar selección
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
