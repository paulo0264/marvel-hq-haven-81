
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Botão Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:block">Anterior</span>
      </button>

      {/* Números das Páginas */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? onPageChange(page) : null}
            disabled={page === '...'}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
              page === currentPage
                ? 'bg-primary text-white shadow-medium'
                : page === '...'
                ? 'cursor-default text-accent'
                : 'text-accent hover:bg-hover hover:text-primary'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botão Próximo */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <span className="hidden sm:block">Próximo</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
