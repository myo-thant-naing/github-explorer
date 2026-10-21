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
  const [seletedLanguage, setSeletedLanguage] = useState("JavaScript");
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
        setData({});
      } else {
        setData(data);
      }
    } finally {
      setLoading(false);
    }
  };

  let slicedData = [];
  let totalPages = 0;
  let languages = [];

  if (mode === "repositories" && Data.items) {
    languages = [
      ...new Set(
        Data.items
          .map((item) => item.language)
          .filter((value) => value !== null),
      ),
    ];
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    console.log(languages);

    let filteredData = Data.items;

    if (seletedLanguage !== "") {
      filteredData = [...filteredData].filter((item) => {
        if (item.language) {
          return item.language.includes(seletedLanguage);
        }
      });
    }
    totalPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);
    const sortedData =
      sort === "asc"
        ? [...filteredData].sort(
            (a, b) => a.stargazers_count - b.stargazers_count,
          )
        : [...filteredData].sort(
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
      <h1 className="max-w-90 text-4xl font-bold">
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
              selectedLanguage={seletedLanguage}
              setSelectedLanguage={setSeletedLanguage}
              languages={languages}
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
