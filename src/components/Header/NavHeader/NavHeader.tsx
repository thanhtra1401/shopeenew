import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import Avatar from "../../shared/Avatar";
import { logoutUser } from "../../../reducers/users.slice";

function NavHeader() {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const { refs, floatingStyles } = useFloating({
  //     open: isOpen,
  //     onOpenChange: setIsOpen,
  //     middleware: [offset(10), flip(), shift()],
  //     whileElementsMounted: autoUpdate,
  //   });
  const authState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex items-center justify-end space-x-4 pt-2 pb-0">
      {/* language switcher */}

      {/* <div className="relative rounded-sm border border-gray-200 bg-white shadow-md ">
        <div className="flex flex-col py-2 pr-28 pl-3">
          <button className="py-2 px-3 text-left hover:text-primary">
            Tiếng Việt
          </button>
          <button className="mt-2 py-2 px-3 text-left hover:text-primary">
            English
          </button>
        </div>
      </div> */}

      <div className="text-white/80">
        <div className="relative group  ">
          <i className="fa-solid fa-globe mr-2"></i>
          Tiếng Việt
          <i className="fa-solid fa-angle-down ml-1"></i>
          <div className=" absolute right-0 rounded-sm border border-gray-200 bg-white shadow-md hidden group-hover:block z-10 ">
            <div className="flex flex-col py-2  pl-3 pr-10 w-40 cursor-pointer">
              <div className="px-3 text-left text-gray-800 hover:text-primary ">
                Tiếng Việt
              </div>
              <div className="mt-2  px-3 text-gray-800 text-left hover:text-primary">
                English
              </div>
            </div>
          </div>
        </div>
      </div>

      {authState.isAuthenticated ? (
        <div className="flex-center">
          <Avatar className="relative group">
            <div className="absolute rounded-sm border border-gray-200 bg-white shadow-md hidden group-hover:block right-0 top-7 z-10 w-40">
              <Link
                to="/profile"
                className="block w-full bg-white py-2 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
              >
                Tài khoản của tôi
              </Link>
              <Link
                to="/purchase"
                className="block w-full bg-white py-2 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full bg-white py-2 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
              >
                Đăng xuất
              </button>
            </div>
          </Avatar>
        </div>
      ) : (
        <div className="flex-center text-white/80">
          <Link to="/register" className="mx-3 capitalize hover:text-white/70">
            Đăng ký
          </Link>
          <div className="border-r-[1px] border-r-white/40" />
          <Link to="/login" className="mx-3 capitalize hover:text-white/70">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavHeader;
