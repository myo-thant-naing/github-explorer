import { useState } from "react";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import UserCard from "./components/UserCard";
import ModeToogleBtn from "./ModeToogleBtn";
import RepoCard from "./RepoCard";
import github from "./api/github";
import Pagination from "./components/Pagination";
import SubHeader from "./components/SubHeader";

const App = () => {
  const [mode, setMode] = useState("profile");
  const [Data, setData] = useState({});
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const onSubmitHandler = async (value) => {
    setLoading(true);
    try {
      const [data, error] = await github(
        `${mode === "profile" ? "https://api.github.com/users/" + encodeURIComponent(value) : "https://api.github.com/search/repositories?q=" + encodeURIComponent(value)}`,
      );
      if (error) {
        toast.error(error);
      } else {
        setData(data);
      }
    } finally {
      setLoading(false);
    }
  };

  let slicedData = [];
  const totalPages = Math.ceil((Data.items?.length ?? 0) / itemsPerPage);

  if (mode === "repositories" && Data.items) {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const sortedData =
      sort === "asc"
        ? [...Data.items].sort(
            (a, b) => a.stargazers_count - b.stargazers_count,
          )
        : [...Data.items].sort(
            (a, b) => b.stargazers_count - a.stargazers_count,
          );
    slicedData = sortedData.slice(firstIndex, lastIndex);
  }

  return (
    <div className="max-w-6xl flex flex-col space-y-10 p-4 mx-auto relative">
      <Toaster />
      <Nav />
      {/* Hero */}
      <ModeToogleBtn setMode={setMode} mode={mode} setData={setData} />
      <h1 className="font-bold text-4xl max-w-90 bg-linear-to-r">
        Explore {mode === "profile" ? "profile" : "repositories"} on{" "}
        <span className="bg-linear-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent">
          Github
        </span>
      </h1>
      <SearchBar
        onSubmitHandler={onSubmitHandler}
        mode={mode}
        loading={loading}
      />
      {Object.keys(Data).length > 0 && mode === "profile" && (
        <UserCard userData={Data} />
      )}
      {mode === "repositories" && slicedData && (
        <>
          <div className="space-y-4">
            <SubHeader
              sort={sort}
              setSort={setSort}
              setCurrentPage={setCurrentPage}
            />
            {slicedData.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
