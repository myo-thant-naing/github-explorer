import { useState } from "react";

const SearchBar = ({ onSubmitHandler }) => {
  const [username, setUsername] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (trimmedUsername !== "") {
      onSubmitHandler(trimmedUsername);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white flex rounded ">
      <input
        type="text"
        placeholder="Find a repository.."
        className="outline-none  w-full px-4"
        name="repo"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
