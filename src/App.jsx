import { useState } from "react";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import UserCard from "./components/UserCard";

const App = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (value) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${value}`);

      if (response.status === 404) {
        throw new Error("User not Found");
      } else if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl flex flex-col space-y-10 p-4 mx-auto">
      <Toaster />
      <Nav />
      {/* Hero */}
      <h1 className="font-bold text-4xl max-w-90 bg-linear-to-r">
        Explore repositories on{" "}
        <span className="bg-linear-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent">
          Github
        </span>
      </h1>
      <SearchBar onSubmitHandler={onSubmitHandler} />
      {loading && <p className="text-gray-600">Loading ...</p>}
      {Object.keys(userData).length > 0 && <UserCard userData={userData} />}
    </div>
  );
};

export default App;
