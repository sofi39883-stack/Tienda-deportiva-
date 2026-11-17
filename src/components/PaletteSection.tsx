import React from 'react';
import { PALETTE_SWATCHES } from '../data/catalogData';
import { BotanicalDivider } from './BotanicalFlourish';

export const PaletteSection: React.FC = () => {
  return (
    <section
      id="paleta"
      className="print-avoid-break bg-[#F7F1EB]/75 border-t border-[#C6A467]/25 py-16 lg:py-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9B646A] font-medium mb-3">
            Identidad Cromática & Detalles
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3A2B2C] text-balance mb-4">
            Armonía en tonos empolvados y acabados sutiles
          </h2>
          <BotanicalDivider className="my-4" />
          <p className="text-sm leading-relaxed text-[#5C4748]">
            Cada prenda de la colección dialoga entre sí a través de una paleta serena y luminosa, pensada para combinar licras, tops y enterizos con total naturalidad.
          </p>
        </div>

        {/* 5 Curated Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-14">
          {PALETTE_SWATCHES.map((tone) => (
            <div
              key={tone.id}
              className="bg-white border border-[#C6A467]/25 p-4 flex flex-col items-center text-center"
            >
              <div
                className="w-14 h-14 rounded-full border border-[#3A2B2C]/10 mb-3 shadow-xs"
                style={{ backgroundColor: tone.hex }}
                aria-hidden="true"
              />
              <span className="font-serif text-lg font-medium text-[#3A2B2C]">
                {tone.name}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6E5859] mt-0.5 tabular-nums">
                {tone.hex}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Boutique Craftsmanship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#C6A467]/25">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9B646A] font-medium mb-2">
              01. Efecto Segunda Piel
            </p>
            <h3 className="font-serif text-xl font-medium text-[#3A2B2C] mb-2">
              Suavidad y frescura
            </h3>
            <p className="text-sm leading-relaxed text-[#5C4748]">
              Textiles respirables de tacto aterciopelado que acompañan entrenamientos de yoga, pilates, funcional o uso diario.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9B646A] font-medium mb-2">
              02. Cortes Anatómicos
            </p>
            <h3 className="font-serif text-xl font-medium text-[#3A2B2C] mb-2">
              Sujeción delicada
            </h3>
            <p className="text-sm leading-relaxed text-[#5C4748]">
              Pretinas altas y costuras planas diseñadas para moldear con comodidad sin marcar ni restringir el movimiento.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9B646A] font-medium mb-2">
              03. Catálogo Editable
            </p>
            <h3 className="font-serif text-xl font-medium text-[#3A2B2C] mb-2">
              Precios y referencias reales
            </h3>
            <p className="text-sm leading-relaxed text-[#5C4748]">
              Todos los campos de precio en COP y referencia se mantienen libres para que ingreses tus valores oficiales o los completes al imprimir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
