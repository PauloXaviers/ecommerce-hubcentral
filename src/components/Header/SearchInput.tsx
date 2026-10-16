import { MagnifyingGlassIcon } from '@phosphor-icons/react';

interface SearchInputProps {
  className: string;
  isMobile?: boolean;
  onSearchChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickSearch?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const SearchInput = ({
  className,
  isMobile = false,
  onSearchChange,
  onKeyDown,
  handleClickSearch,
  inputRef,
}: SearchInputProps) => {
  return (
    <div className={`search-container ${isMobile ? 'mobile' : 'default'}`}>
      <label
        htmlFor={isMobile ? 'header-search-mobile' : 'header-search-desktop'}
        className="sr-only"
      >
        Buscar produtos
      </label>
      <input
        ref={inputRef}
        onChange={(event) => onSearchChange(event.target.value)}
        onKeyDown={onKeyDown}
        id={isMobile ? 'header-search-mobile' : 'header-search-desktop'}
        type="search"
        className={className}
        placeholder="Iphone 13 Pro Max, Samsung, Camiseta..."
      />
      <button
        type="button"
        className="search-button"
        aria-label="Buscar"
        onClick={handleClickSearch}
      >
        <MagnifyingGlassIcon size={16} />
      </button>
    </div>
  );
};
