import { useState } from "react";

const SearchBar = ({ onSubmitHandler, mode }) => {
  const [inputValue, setInputValue] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = inputValue.trim();

    if (trimmedUsername !== "") {
      onSubmitHandler(trimmedUsername);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white flex rounded ">
      <input
        type="text"
        placeholder={`Find a ${mode === "profile" ? "username" : "repositorie"}..`}
        className="outline-none  w-full px-4"
        name="repo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-10 sm:w-1/5 h-full py-4 bg-primary text-white font-light">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
