import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  storeName: string;
  selectionCount: number;
  onOpenSelection: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeName,
  selectionCount,
  onOpenSelection,
}) => {
  return (
    <header className="no-print sticky top-0 z-30 bg-[#FCF9F7]/92 backdrop-blur-md border-b border-[#C6A467]/20">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#portada"
          className="font-serif text-2xl font-medium tracking-wide text-[#3A2B2C] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B57C82] rounded-sm"
        >
          {storeName || 'Aura Rosé'}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E5859]"
        >
          <a
            href="#portada"
            className="hover:text-[#3A2B2C] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A467]"
          >
            Portada
          </a>
          <a
            href="#coleccion"
            className="hover:text-[#3A2B2C] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A467]"
          >
            Colección
          </a>
          <a
            href="#paleta"
            className="hover:text-[#3A2B2C] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A467]"
          >
            Paleta
          </a>
          <a
            href="#personalizar"
            className="hover:text-[#3A2B2C] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A467]"
          >
            Precios
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSelection}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#B57C82] hover:bg-[#9B646A] transition-colors rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B57C82]"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="tabular-nums">Selección ({selectionCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
