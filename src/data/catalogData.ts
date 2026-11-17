import { CatalogProduct, ColorSwatch, ProductCategory, StoreSettings } from '../types/catalog';

export const COVER_IMAGE_URL = '/src/assets/images/hero_portada_boutique_1794920725619.jpg';

export const PALETTE_SWATCHES: ColorSwatch[] = [
  { id: 'palo-rosa', name: 'Palo de Rosa', hex: '#C99294' },
  { id: 'rosa-empolvado', name: 'Rosa Empolvado', hex: '#E5C3C6' },
  { id: 'rosa-nude', name: 'Rosa Nude', hex: '#DFBEB5' },
  { id: 'beige-claro', name: 'Beige Claro', hex: '#E6D9CC' },
  { id: 'blanco-marfil', name: 'Blanco Marfil', hex: '#FAF7F4' },
];

export const CATEGORIES: ('Todas' | ProductCategory)[] = [
  'Todas',
  'Licras Cortas',
  'Licras Largas',
  'Enterizos Cortos',
  'Enterizos Largos',
  'Tops',
  'Conjuntos',
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Aura Rosé',
  collectionSubtitle: 'Catálogo Boutique · Ropa Deportiva Femenina',
  coverDescription:
    'Prendas diseñadas para abrazar tu movimiento con suavidad, frescura y siluetas delicadas en tonos empolvados y neutros luminosos.',
};

export const INITIAL_PRODUCTS: CatalogProduct[] = [
  {
    id: 'licra-deportiva-corta',
    category: 'Licras Cortas',
    name: 'Licra Deportiva Corta Sculpt',
    shortDescription:
      'Pretina anatómica de tiro alto con compresión suave que estiliza la cintura sin enrollarse durante el entrenamiento.',
    fabricNote: 'Poliamida y elastano mate · Tacto frío y transpirable',
    imageUrl: '/src/assets/images/prod_licra_corta_1794920725364.jpg',
    imageAlt: 'Modelo femenina luciendo licra deportiva corta tiro alto en tono palo de rosa',
    priceCop: null,
    reference: '',
    colors: [
      PALETTE_SWATCHES[0],
      PALETTE_SWATCHES[1],
      PALETTE_SWATCHES[2],
      PALETTE_SWATCHES[3],
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'licra-deportiva-larga',
    category: 'Licras Largas',
    name: 'Licra Deportiva Larga Velvet',
    shortDescription:
      'Legging largo de tiro alto con costuras imperceptibles, acabado sedoso y ajuste moldeador de tobillo a cintura.',
    fabricNote: 'Tejido elástico en cuatro direcciones · Cero transparencia',
    imageUrl: '/src/assets/images/prod_licra_larga_1794920725003.jpg',
    imageAlt: 'Modelo femenina con licra deportiva larga en rosa empolvado de tiro alto',
    priceCop: null,
    reference: '',
    colors: [
      PALETTE_SWATCHES[1],
      PALETTE_SWATCHES[0],
      PALETTE_SWATCHES[2],
      PALETTE_SWATCHES[4],
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'enterizo-deportivo-corto',
    category: 'Enterizos Cortos',
    name: 'Enterizo Deportivo Corto Brisa',
    shortDescription:
      'Diseño de una sola pieza con escote cuadrado femenino y largo medio en muslo que brinda sujeción y libertad total.',
    fabricNote: 'Microfibra suave de secado rápido · Soporte medio integrado',
    imageUrl: '/src/assets/images/prod_enterizo_corto_1794920725538.jpg',
    imageAlt: 'Modelo femenina usando enterizo deportivo corto en tono rosa nude',
    priceCop: null,
    reference: '',
    colors: [
      PALETTE_SWATCHES[2],
      PALETTE_SWATCHES[0],
      PALETTE_SWATCHES[3],
      PALETTE_SWATCHES[1],
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'enterizo-deportivo-largo',
    category: 'Enterizos Largos',
    name: 'Enterizo Deportivo Largo Silueta',
    shortDescription:
      'Enterizo largo envolvente con líneas estratégicas en cintura y tirantes delicados que alargan visualmente la figura.',
    fabricNote: 'Tejido esculpidor de alta elongación · Acabado mate elegante',
    imageUrl: '/src/assets/images/prod_enterizo_largo_1794920726611.jpg',
    imageAlt: 'Modelo femenina luciendo enterizo deportivo largo en tono palo de rosa',
    priceCop: null,
    reference: '',
    colors: [
      PALETTE_SWATCHES[0],
      PALETTE_SWATCHES[2],
      PALETTE_SWATCHES[1],
      PALETTE_SWATCHES[3],
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'top-deportivo',
    category: 'Tops',
    name: 'Top Deportivo Atelier',
    shortDescription:
      'Top de tirantes dobles finos y banda inferior contorneada que ofrece soporte cómodo y una estética limpia y femenina.',
    fabricNote: 'Forro interno suave con copas removibles · Secado rápido',
    imageUrl: '/src/assets/images/prod_top_deportivo_1794920726848.jpg',
    imageAlt: 'Modelo femenina con top deportivo de tirantes dobles en tono beige claro',
    priceCop: null,
    reference: '',
    colors: [
      PALETTE_SWATCHES[3],
      PALETTE_SWATCHES[4],
      PALETTE_SWATCHES[2],
      PALETTE_SWATCHES[0],
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'conjunto-dos-piezas',
    category: 'Conjuntos',
    name: 'Conjunto Dos Piezas Élan',
    shortDescription:
      'Dúo coordinado de top largo estructurado y licra de tiro alto en armonía monocromática para yoga, pilates o estudio.',
    fabricNote: 'Conjunto completo · Tejido ligero efecto segunda piel',
    imageUrl: '/src/assets/images/prod_conjunto_dos_piezas_1794920727897.jpg',
    imageAlt: 'Modelo femenina vistiendo conjunto deportivo de dos piezas en palo de rosa suave',
    priceCop: null,
    reference: '',
    colors: [
      PALETTE_SWATCHES[1],
      PALETTE_SWATCHES[0],
      PALETTE_SWATCHES[2],
      PALETTE_SWATCHES[3],
      PALETTE_SWATCHES[4],
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
];

export function formatCop(value: number | null): string | null {
  if (value === null || Number.isNaN(value) || value <= 0) {
    return null;
  }
  return `$ ${new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(value)} COP`;
}
