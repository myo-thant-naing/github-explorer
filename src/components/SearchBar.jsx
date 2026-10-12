import { useState } from "react";

const SearchBar = () => {
  const [repo, setRepo] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(repo);
  };

  return (
    <form onSubmit={onSubmitHandler} className="bg-white flex rounded ">
      <input
        type="text"
        placeholder="Find a repository.."
        className="outline-none  w-full px-4"
        name="repo"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
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
