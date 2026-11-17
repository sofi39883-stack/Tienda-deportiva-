import React from 'react';
import { Pencil, Printer } from 'lucide-react';
import { COVER_IMAGE_URL } from '../data/catalogData';
import { StoreSettings } from '../types/catalog';
import { BotanicalDivider, CornerBlossom } from './BotanicalFlourish';

interface CoverHeroProps {
  settings: StoreSettings;
  isEditMode: boolean;
  onUpdateSettings: (next: Partial<StoreSettings>) => void;
  onToggleEditMode: () => void;
  onPrintCatalog: () => void;
}

export const CoverHero: React.FC<CoverHeroProps> = ({
  settings,
  isEditMode,
  onUpdateSettings,
  onToggleEditMode,
  onPrintCatalog,
}) => {
  return (
    <section
      id="portada"
      className="print-break-after bg-[#F7F1EB] border-b border-[#C6A467]/25"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Cover Typography */}
          <div className="lg:col-span-6 relative bg-[#FCF9F7] border border-[#C6A467]/30 px-8 py-12 sm:px-12 sm:py-16 flex flex-col justify-between">
            <CornerBlossom className="absolute top-3 left-3 rotate-0" />
            <CornerBlossom className="absolute bottom-3 right-3 rotate-180" />

            <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
              {isEditMode ? (
                <input
                  type="text"
                  aria-label="Subtítulo de la colección"
                  value={settings.collectionSubtitle}
                  onChange={(e) => onUpdateSettings({ collectionSubtitle: e.target.value })}
                  className="w-full max-w-md text-center text-xs tracking-[0.2em] uppercase text-[#9B646A] bg-white/80 border border-[#C6A467]/40 rounded px-3 py-1.5 mb-5 focus:outline-none focus:ring-2 focus:ring-[#B57C82]"
                />
              ) : (
                <p className="text-xs tracking-[0.22em] uppercase text-[#9B646A] font-medium mb-5">
                  {settings.collectionSubtitle}
                </p>
              )}

              {isEditMode ? (
                <input
                  type="text"
                  aria-label="Nombre de la tienda"
                  value={settings.storeName}
                  onChange={(e) => onUpdateSettings({ storeName: e.target.value })}
                  placeholder="Nombre de tu tienda"
                  className="w-full max-w-md text-center font-serif text-4xl sm:text-5xl font-medium text-[#3A2B2C] bg-white/90 border border-[#C6A467]/45 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#B57C82]"
                />
              ) : (
                <h1 className="font-serif text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[1.08] font-medium text-[#3A2B2C] tracking-tight text-balance mb-4">
                  {settings.storeName || 'Aura Rosé'}
                </h1>
              )}

              <BotanicalDivider className="my-5" />

              {isEditMode ? (
                <textarea
                  aria-label="Descripción de portada"
                  value={settings.coverDescription}
                  onChange={(e) => onUpdateSettings({ coverDescription: e.target.value })}
                  rows={3}
                  className="w-full max-w-md text-center text-sm leading-relaxed text-[#5C4748] bg-white/80 border border-[#C6A467]/40 rounded px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-[#B57C82]"
                />
              ) : (
                <p className="text-[15px] leading-[1.7] text-[#5C4748] max-w-md mb-8">
                  {settings.coverDescription}
                </p>
              )}

              {/* Unboxed Editorial Category Summary */}
              <p className="text-xs text-[#6E5859] tracking-wide mb-8">
                Licras · Enterizos · Tops · Conjuntos de Dos Piezas
              </p>

              <div className="no-print flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#coleccion"
                  className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-medium tracking-wider uppercase text-white bg-[#B57C82] hover:bg-[#9B646A] transition-colors rounded-md whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B57C82]"
                >
                  Explorar Colección
                </a>
                <button
                  type="button"
                  onClick={onToggleEditMode}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium tracking-wide text-[#3A2B2C] bg-white border border-[#C6A467]/45 hover:border-[#B57C82] transition-colors rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82]"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#A68346]" aria-hidden="true" />
                  <span>{isEditMode ? 'Finalizar Edición' : 'Editar Tienda y Precios'}</span>
                </button>
                <button
                  type="button"
                  onClick={onPrintCatalog}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium tracking-wide text-[#6E5859] hover:text-[#3A2B2C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82] rounded-md"
                >
                  <Printer className="w-3.5 h-3.5 text-[#A68346]" aria-hidden="true" />
                  <span>Imprimir PDF</span>
                </button>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#C6A467]/20 flex items-center justify-between text-[11px] tracking-widest uppercase text-[#6E5859]">
              <span>Edición Boutique</span>
              <span>Precios en COP</span>
            </div>
          </div>

          {/* Right Column: Cover Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-full min-h-[440px] lg:min-h-[600px] bg-[#EBD5D5]/40 p-3 border border-[#C6A467]/30">
              <div className="relative w-full h-full overflow-hidden bg-[#F2DCD8]/40">
                <img
                  src={COVER_IMAGE_URL}
                  alt="Editorial de portada con conjunto deportivo femenino en tono palo de rosa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#3A2B2C]/65 via-[#3A2B2C]/25 to-transparent flex items-end p-6">
                  <p className="font-serif italic text-lg text-[#FCF9F7] tracking-wide">
                    Delicadeza, soporte y elegancia en cada entrenamiento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
