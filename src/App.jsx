import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div className="max-w-6xl flex flex-col space-y-10 p-4 mx-auto">
      <Nav />

      {/* Hero */}
      <h1 className="font-bold text-4xl max-w-90 bg-linear-to-r">
        Explore repositories on{" "}
        <span className="bg-linear-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent">
          Github
        </span>
      </h1>
      <SearchBar />
    </div>
  );
};

export default App;
