const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  const buttonStyle =
    "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-6">
      {/* Previous button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${buttonStyle} border-gray-200 bg-white text-gray-700 hover:bg-gray-100`}>
        <span className="hidden sm:inline">← Previous</span>
        <span className="sm:hidden">←</span>
      </button>

      <div className="hidden items-center gap-2 sm:flex">
        {getPages().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={`${buttonStyle} ${
                currentPage === page
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
              }`}>
              {page}
            </button>
          ),
        )}
      </div>

      <span className="px-2 text-sm text-gray-600 sm:hidden">
        {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${buttonStyle} border-gray-200 bg-white text-gray-700 hover:bg-gray-100`}>
        <span className="hidden sm:inline">Next →</span>
        <span className="sm:hidden">→</span>
      </button>
    </nav>
  );
};

export default Pagination;
