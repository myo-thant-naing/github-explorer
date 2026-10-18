import { useState } from "react";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import UserCard from "./components/UserCard";
import ModeToogleBtn from "./ModeToogleBtn";
import RepoCard from "./RepoCard";
import github from "./api/github";

const App = () => {
  const [mode, setMode] = useState("profile");
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(false);
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
  return (
    <div className="max-w-6xl flex flex-col space-y-10 p-4 mx-auto">
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
      <SearchBar onSubmitHandler={onSubmitHandler} mode={mode} />
      {loading && <p className="text-gray-600">Loading ...</p>}
      {Object.keys(Data).length > 0 && mode === "profile" && (
        <UserCard userData={Data} />
      )}
      {Object.keys(Data).length > 0 &&
        mode === "repositories" &&
        Data.items?.map((repo, index) => <RepoCard key={index} repo={repo} />)}
    </div>
  );
};

export default App;
