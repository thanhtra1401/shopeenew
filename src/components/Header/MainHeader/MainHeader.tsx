import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";
import NavHeader from "../NavHeader/NavHeader";

export default function MainHeader() {
  return (
    <header className="bg-[linear-gradient(-180deg,#f53d2d,#f63)]">
      <div className="container">
        <NavHeader />
        <nav className="grid w-full grid-cols-10 space-x-4 py-4 flex-center">
          <div className="col-span-2">
            <Link to="/">
              <Logo className="h-full w-28 fill-white lg:w-44" />
            </Link>
          </div>

          <form className="col-span-7">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative flex-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {/* <AiOutlineSearch /> */}
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full rounded-sm rounded-r-none border-none border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 outline-none"
                placeholder="FREESHIP ĐƠN TỪ 0 Đ..."
                required
              />
              <button
                type="submit"
                className="h-11 w-12 bg-[#F94F2F] border-solid border-2 border-l-0 rounded-r-sm border-white"
              >
                <i className="fa-solid fa-magnifying-glass text-white h-4 "></i>
                {/* <AiOutlineSearch /> */}
              </button>
            </div>
          </form>
          <div className="col-span-1">
            <i className="fa-solid fa-cart-shopping text-white text-xl cursor-pointer p-2"></i>
          </div>
        </nav>
      </div>
    </header>
  );
}
