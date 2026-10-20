import { useState } from "react";
import { FiArrowUp, FiCheck, FiChevronDown } from "react-icons/fi";

const SubHeader = ({ sort, setSort, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Most Stars", value: "desc" },
    { label: "Fewest Stars", value: "asc" },
  ];

  const selectedOption = options.find((option) => option.value === sort);

  return (
    <div className="flex items-center justify-end">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10">
          <FiArrowUp size={16} />
          {selectedOption?.label || "Sort"}
          <FiChevronDown
            size={14}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#1c1c1c]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSort(option.value);
                  setIsOpen(false);
                  setCurrentPage(1);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10">
                {option.label}
                {sort === option.value && <FiCheck size={15} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
