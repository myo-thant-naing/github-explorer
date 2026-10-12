const Nav = () => {
  return (
    <div className="flex  items-center  p-4 space-x-2  sticky top-0 z-20">
      <img src="/logo.svg" alt="" className="w-8 h-8" />
      <h3 className="font-medium text-xl">
        github_<span className="text-gray-400">explorer</span>
      </h3>
    </div>
  );
};

export default Nav;
