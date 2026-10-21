import { useState } from "react";

const SearchBar = ({ onSubmitHandler, mode, loading }) => {
  const [inputValue, setInputValue] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = inputValue.trim();

    if (trimmedUsername !== "") {
      onSubmitHandler(trimmedUsername);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white flex rounded">
      <input
        type="text"
        placeholder={`Find ${mode === "profile" ? "a username" : "repositories"}...`}
        className="outline-none  w-full px-4"
        name="repo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-10 sm:w-1/5 py-4 bg-primary text-white font-light flex items-center justify-center gap-2 transition-opacity duration-200 ${
          loading ? "opacity-60" : "hover:opacity-90"
        }`}>
        {loading ? (
          <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

export default SearchBar;
