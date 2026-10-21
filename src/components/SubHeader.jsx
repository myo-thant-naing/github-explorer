import { useState } from "react";
import { FiArrowUp, FiCheck, FiChevronDown, FiCode } from "react-icons/fi";

const SubHeader = ({
  sort,
  setSort,
  setCurrentPage,
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const sortOptions = [
    { label: "Most Stars", value: "desc" },
    { label: "Fewest Stars", value: "asc" },
  ];

  const languageOptions = [
    { label: "All Languages", value: "" },
    ...languages.map((language) => ({
      label: language,
      value: language,
    })),
  ];

  const selectedSort = sortOptions.find((option) => option.value === sort);

  const selectedLanguageOption = languageOptions.find(
    (option) => option.value === selectedLanguage,
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsLanguageOpen(!isLanguageOpen);
            setIsSortOpen(false);
          }}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10">
          <FiCode size={16} />
          {selectedLanguageOption?.label || "All Languages"}
          <FiChevronDown
            size={14}
            className={`transition-transform ${
              isLanguageOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isLanguageOpen && (
          <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#1c1c1c]">
            {languageOptions.map((option) => (
              <button
                key={option.value || "all"}
                type="button"
                onClick={() => {
                  setSelectedLanguage(option.value);
                  setCurrentPage(1);
                  setIsLanguageOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10">
                {option.label}
                {selectedLanguage === option.value && <FiCheck size={15} />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsLanguageOpen(false);
          }}
          className="flex w-48 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10">
          <FiArrowUp size={16} />
          {selectedSort?.label || "Sort"}
          <FiChevronDown
            size={14}
            className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isSortOpen && (
          <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-gray-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-[#1c1c1c]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSort(option.value);
                  setCurrentPage(1);
                  setIsSortOpen(false);
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
