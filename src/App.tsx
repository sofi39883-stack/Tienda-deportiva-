import { useEffect, useMemo, useState } from 'react';
import { Pencil, Printer, RotateCcw, Search } from 'lucide-react';
import { BotanicalDivider } from './components/BotanicalFlourish';
import { CoverHero } from './components/CoverHero';
import { Header } from './components/Header';
import { PaletteSection } from './components/PaletteSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SelectionDrawer } from './components/SelectionDrawer';
import {
  CATEGORIES,
  DEFAULT_STORE_SETTINGS,
  INITIAL_PRODUCTS,
} from './data/catalogData';
import {
  CatalogProduct,
  ColorSwatch,
  ProductCategory,
  SelectionItem,
  StoreSettings,
} from './types/catalog';

const STORAGE_PRODUCTS_KEY = 'aura_rose_catalog_products_v1';
const STORAGE_SETTINGS_KEY = 'aura_rose_catalog_settings_v1';
const STORAGE_SELECTION_KEY = 'aura_rose_catalog_selection_v1';

export default function App() {
  const [products, setProducts] = useState<CatalogProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return INITIAL_PRODUCTS.map((base) => {
            const match = parsed.find(
              (item): item is Partial<CatalogProduct> =>
                Boolean(item && typeof item === 'object' && item.id === base.id)
            );
            if (!match) return base;
            return {
              ...base,
              priceCop:
                typeof match.priceCop === 'number' && Number.isFinite(match.priceCop) && match.priceCop > 0
                  ? match.priceCop
                  : null,
              reference: typeof match.reference === 'string' ? match.reference : '',
              shortDescription:
                typeof match.shortDescription === 'string' && match.shortDescription.trim()
                  ? match.shortDescription
                  : base.shortDescription,
            };
          });
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_PRODUCTS;
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            storeName:
              typeof parsed.storeName === 'string'
                ? parsed.storeName
                : DEFAULT_STORE_SETTINGS.storeName,
            collectionSubtitle:
              typeof parsed.collectionSubtitle === 'string'
                ? parsed.collectionSubtitle
                : DEFAULT_STORE_SETTINGS.collectionSubtitle,
            coverDescription:
              typeof parsed.coverDescription === 'string'
                ? parsed.coverDescription
                : DEFAULT_STORE_SETTINGS.coverDescription,
          };
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_STORE_SETTINGS;
  });

  const [selection, setSelection] = useState<SelectionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SELECTION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is SelectionItem =>
              Boolean(
                item &&
                  typeof item.productId === 'string' &&
                  typeof item.colorName === 'string' &&
                  typeof item.size === 'string' &&
                  typeof item.quantity === 'number' &&
                  item.quantity > 0
              )
          );
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState<'Todas' | ProductCategory>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalState, setModalState] = useState<{
    product: CatalogProduct | null;
    color: ColorSwatch | null;
  }>({ product: null, color: null });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(storeSettings));
    } catch {
      // ignore
    }
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SELECTION_KEY, JSON.stringify(selection));
    } catch {
      // ignore
    }
  }, [selection]);

  useEffect(() => {
    if (storeSettings.storeName.trim()) {
      document.title = `${storeSettings.storeName} — Catálogo Deportivo Femenino`;
    }
  }, [storeSettings.storeName]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2200);
  };

  const handleUpdateProduct = (id: string, patch: Partial<CatalogProduct>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
    setModalState((prev) =>
      prev.product && prev.product.id === id
        ? { ...prev, product: { ...prev.product, ...patch } }
        : prev
    );
  };

  const handleUpdateSettings = (patch: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...patch }));
  };

  const handleResetEmptyFields = () => {
    setProducts(INITIAL_PRODUCTS);
    setStoreSettings(DEFAULT_STORE_SETTINGS);
    showToast('Espacios de precios y referencias restablecidos en blanco.');
  };

  const handleAddToSelection = (
    product: CatalogProduct,
    color: ColorSwatch,
    size: string
  ) => {
    setSelection((prev) => {
      const existingIdx = prev.findIndex(
        (entry) =>
          entry.productId === product.id &&
          entry.colorName === color.name &&
          entry.size === size
      );
      if (existingIdx >= 0) {
        return prev.map((entry, idx) =>
          idx === existingIdx ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          colorName: color.name,
          colorHex: color.hex,
          size,
          quantity: 1,
        },
      ];
    });
    showToast(`${product.name} (${color.name}, ${size}) agregado a tu selección.`);
  };

  const handleUpdateSelectionQuantity = (index: number, delta: number) => {
    setSelection((prev) =>
      prev
        .map((item, idx) =>
          idx === index ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveSelectionItem = (index: number) => {
    setSelection((prev) => prev.filter((_, idx) => idx !== index));
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'Todas' || product.category === activeCategory;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.reference.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, searchQuery]);

  const totalSelectedCount = selection.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F7] text-[#3A2B2C]">
      <Header
        storeName={storeSettings.storeName}
        selectionCount={totalSelectedCount}
        onOpenSelection={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1">
        {/* Section 1: Portada Editorial */}
        <CoverHero
          settings={storeSettings}
          isEditMode={isEditMode}
          onUpdateSettings={handleUpdateSettings}
          onToggleEditMode={() => setIsEditMode((prev) => !prev)}
          onPrintCatalog={() => window.print()}
        />

        {/* Section 2: Colección de Prendas */}
        <section id="coleccion" className="py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9B646A] font-medium mb-3">
                Catálogo de Prendas
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3A2B2C] text-balance mb-3">
                Siluetas deportivas de estética femenina
              </h2>
              <BotanicalDivider className="my-4" />
              <p className="text-sm leading-relaxed text-[#5C4748]">
                Haz clic sobre cualquier precio en COP o referencia para ingresar tus valores reales, o activa el modo edición para personalizar toda la colección.
              </p>
            </div>

            {/* Catalog Toolbar: Category Filter + Search + Edit/Print Actions */}
            <div
              id="personalizar"
              className="no-print mb-10 pb-6 border-b border-[#C6A467]/25 flex flex-col gap-5"
            >
              {/* Category Segmented Tabs */}
              <div
                className="flex flex-wrap items-center justify-center gap-1.5"
                role="tablist"
                aria-label="Filtrar prendas por categoría"
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82] ${
                        isActive
                          ? 'bg-[#B57C82] text-white'
                          : 'bg-[#F7F1EB] text-[#5C4748] hover:bg-[#EBD5D5]/70 hover:text-[#3A2B2C]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Search & Catalog Customization Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search
                    className="w-4 h-4 text-[#9B646A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por prenda o referencia..."
                    aria-label="Buscar prenda o referencia"
                    className="w-full pl-9 pr-4 py-2 text-xs text-[#3A2B2C] bg-white border border-[#C6A467]/35 rounded-md placeholder:text-[#8A7374] focus:outline-none focus:ring-2 focus:ring-[#B57C82]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEditMode((prev) => !prev)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82] ${
                      isEditMode
                        ? 'bg-[#3A2B2C] text-white border-[#3A2B2C]'
                        : 'bg-white text-[#3A2B2C] border-[#C6A467]/40 hover:border-[#B57C82]'
                    }`}
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEditMode ? 'Modo Edición Activo' : 'Editar Precios y Refs.'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetEmptyFields}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#6E5859] hover:text-[#3A2B2C] bg-white border border-[#C6A467]/30 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82]"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#A68346]" aria-hidden="true" />
                    <span>Dejar espacios en blanco</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#3A2B2C] bg-[#F7F1EB] hover:bg-[#EBD5D5] border border-[#C6A467]/35 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82]"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#A68346]" aria-hidden="true" />
                    <span>Imprimir Catálogo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid (3 columns desktop, 2 tablet, 1 mobile) */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#C6A467]/25 p-8">
                <p className="font-serif text-2xl text-[#3A2B2C] mb-2">
                  No encontramos prendas con ese criterio
                </p>
                <p className="text-sm text-[#6E5859] mb-5">
                  Prueba limpiando el filtro o seleccionando otra categoría del catálogo.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('Todas');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#B57C82] hover:bg-[#9B646A] rounded-md cursor-pointer"
                >
                  Ver toda la colección
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isEditMode={isEditMode}
                    onUpdateProduct={handleUpdateProduct}
                    onOpenDetail={(prod, color) =>
                      setModalState({ product: prod, color })
                    }
                    onQuickAdd={handleAddToSelection}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Paleta & Craftsmanship */}
        <PaletteSection />
      </main>

      {/* Boutique Minimalist Footer */}
      <footer className="bg-[#FCF9F7] border-t border-[#C6A467]/25 py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center gap-3">
          <span className="font-serif text-2xl font-medium text-[#3A2B2C]">
            {storeSettings.storeName || 'Aura Rosé'}
          </span>
          <BotanicalDivider />
          <p className="text-xs text-[#6E5859] max-w-md leading-relaxed">
            Catálogo de ropa deportiva femenina · Valores expresados en pesos colombianos (COP) · Precios y referencias editables según disponibilidad de inventario.
          </p>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductModal
        product={modalState.product}
        initialColor={modalState.color}
        onClose={() => setModalState({ product: null, color: null })}
        onUpdateProduct={handleUpdateProduct}
        onAddToSelection={handleAddToSelection}
      />

      {/* Selection Drawer */}
      <SelectionDrawer
        isOpen={isDrawerOpen}
        storeName={storeSettings.storeName}
        items={selection}
        products={products}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateQuantity={handleUpdateSelectionQuantity}
        onRemoveItem={handleRemoveSelectionItem}
        onClearSelection={() => setSelection([])}
      />

      {/* Subtle Toast Confirmation */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="no-print fixed bottom-5 right-5 z-40 max-w-sm bg-[#3A2B2C] text-[#FCF9F7] text-xs px-4 py-3 rounded-md shadow-lg border border-[#C6A467]/40"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
