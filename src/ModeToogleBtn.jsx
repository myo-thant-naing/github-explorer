const ModeToogleBtn = ({ setMode, mode, setData }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          setMode("profile");
          setData({});
        }}
        className={`py-2 w-48 ${mode === "profile" ? "border bg-gray-100" : ""} rounded-full transition-all `}>
        User
      </button>
      <button
        onClick={() => {
          setMode("repositories");
          setData({});
        }}
        className={`py-2 w-48 ${mode === "repositories" ? "border bg-gray-100" : ""}  rounded-full transition-all`}>
        Repositories
      </button>
    </div>
  );
};

export default ModeToogleBtn;
