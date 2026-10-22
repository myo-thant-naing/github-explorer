import { useState } from "react";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import UserCard from "./components/UserCard";
import ModeToogleBtn from "./ModeToogleBtn";
import RepoCard from "./components/RepoCard";
import github from "./api/github";
import Pagination from "./components/Pagination";
import SubHeader from "./components/SubHeader";

const App = () => {
  const [mode, setMode] = useState("profile");
  const [data, setData] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("stargazers_count");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getApiUrl = ({ mode, value }) => {
    if (mode === "profile") {
      return "https://api.github.com/users/" + encodeURIComponent(value);
    } else if (mode === "repositories") {
      return (
        "https://api.github.com/search/repositories?q=" +
        encodeURIComponent(value)
      );
    }
  };
  const onSubmitHandler = async ({ mode, value }) => {
    try {
      setLoading(true);
      const data = await github(getApiUrl({ mode, value }));
      setData(data);
      setSelectedLanguage("");
    } catch (error) {
      toast.error(error.message);
      setData({});
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  let slicedData = [];
  let totalPages = 0;
  let languages = [];

  if (mode === "repositories" && data.items) {
    // filtering
    languages = [
      ...new Set(
        data.items
          .map((item) => item.language)
          .filter((value) => value !== null),
      ),
    ];
    let filteredData = data.items;
    if (selectedLanguage !== "") {
      filteredData = [...filteredData].filter((item) => {
        if (item.language) {
          return item.language === selectedLanguage;
        }
      });
    }
    //  sorting
    const sortedData = [...filteredData].sort((a, b) => {
      const difference = a[sortBy] - b[sortBy];
      return sortOrder === "asc" ? difference : -difference;
    });

    // pagination
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    totalPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);
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
      {Object.keys(data).length > 0 && mode === "profile" && (
        <UserCard userData={data} />
      )}
      {Object.keys(data).length > 0 &&
        mode === "repositories" &&
        slicedData && (
          <>
            <div className="space-y-4">
              <SubHeader
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                setCurrentPage={setCurrentPage}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                languages={languages}
              />
              {data.items?.length === 0 && (
                <div className="text-gray-400">Empty</div>
              )}
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
