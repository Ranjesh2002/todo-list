const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-900 text-white py-2.5 ">
      <div className="logo">
        <span className="fonr-bold text-xl mx-9">todos</span>
      </div>
      <ul className="flex gap-9 mx-9">
        <li className="cursor-pointer hover:font-bold trasition-all duration-50">
          home
        </li>
        <li className="cursor-pointer hover:font-bold trasition-all duration-50">
          todos
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
