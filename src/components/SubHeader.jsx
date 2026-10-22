import { useState } from "react";
import { CgGitFork } from "react-icons/cg";
import {
  FiArrowDown,
  FiArrowUp,
  FiCheck,
  FiChevronDown,
  FiCode,
  FiStar,
} from "react-icons/fi";

const SubHeader = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  setCurrentPage,
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    {
      label: "Stars",
      value: "stargazers_count",
      icon: FiStar,
    },
    {
      label: "Forks",
      value: "forks_count",
      icon: CgGitFork,
    },
  ];

  const languageOptions = [
    { label: "All Languages", value: "" },
    ...languages.map((language) => ({
      label: language,
      value: language,
    })),
  ];

  const selectedSort = sortOptions.find((option) => option.value === sortBy);

  const selectedLanguageOption = languageOptions.find(
    (option) => option.value === selectedLanguage,
  );

  const handleSortBy = (value) => {
    setSortBy(value);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((previous) => (previous === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const SortIcon = selectedSort?.icon ?? FiStar;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Language Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsLanguageOpen((previous) => !previous);
            setIsSortOpen(false);
          }}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10">
          <FiCode size={16} className="text-gray-500" />

          <span className="max-w-32 truncate text-gray-700">
            {selectedLanguageOption?.label ?? "All Languages"}
          </span>

          <FiChevronDown
            size={15}
            className={`transition-transform duration-200 text-gray-700 ${
              isLanguageOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isLanguageOpen && (
          <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-52 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#1c1c1c]">
            {languageOptions.map((option) => (
              <button
                key={option.value || "all"}
                type="button"
                onClick={() => {
                  setSelectedLanguage(option.value);
                  setCurrentPage(1);
                  setIsLanguageOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  selectedLanguage === option.value
                    ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                }`}>
                <span className="truncate ">{option.label}</span>

                {selectedLanguage === option.value && (
                  <FiCheck size={15} className="shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sorting Controls */}
      <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
        {/* Select Sort Field */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsSortOpen((previous) => !previous);
              setIsLanguageOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10">
            <SortIcon size={16} className="text-indigo-500" />

            <span className="text-gray-700">
              {" "}
              {selectedSort?.label ?? "Stars"}
            </span>

            <FiChevronDown
              size={14}
              className={`transition-transform duration-200 text-gray-700 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#1c1c1c]">
              {sortOptions.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = sortBy === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortBy(option.value)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                      isSelected
                        ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                    }`}>
                    <span className="flex items-center gap-2">
                      <OptionIcon size={15} />
                      {option.label}
                    </span>

                    {isSelected && <FiCheck size={15} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />

        {/* Toggle Sort Order */}
        <button
          type="button"
          onClick={toggleSortOrder}
          title={
            sortOrder === "desc"
              ? "Descending — click for ascending"
              : "Ascending — click for descending"
          }
          aria-label={`Change sort order. Currently ${
            sortOrder === "desc" ? "descending" : "ascending"
          }`}
          className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-indigo-300">
          {sortOrder === "desc" ? (
            <FiArrowDown size={17} className="text-indigo-600" />
          ) : (
            <FiArrowUp size={17} className="text-indigo-600" />
          )}

          <span className="hidden sm:inline text-gray-700 w-20">
            {sortOrder === "desc" ? "High to low" : "Low to high"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
