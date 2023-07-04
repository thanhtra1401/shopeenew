import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Logo from "../../Logo/Logo";
import NavHeader from "../NavHeader/NavHeader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "../../../utils/schema";
import { Purchase } from "../../../types/purchase.type";
import { useEffect, useState } from "react";
import purchaseApi from "../../../apis/purchase.api";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

export default function MainHeader() {
  const authState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(searchSchema),
  });
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: "/",
      search: createSearchParams({ name: data.product_name }).toString(),
    });
    reset();
  });
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  useEffect(() => {
    purchaseApi
      .getPurchases({ status: -1 })
      .then((data) => setPurchases(data.data.data));
  }, [purchases]);
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

          <form className="col-span-7" onSubmit={onSubmit}>
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
                {...register("product_name")}
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
            <i className="relative fa-solid fa-cart-shopping text-white text-xl cursor-pointer p-2 ">
              {authState.isAuthenticated && purchases.length > 0 && (
                <div className="absolute bg-white rounded-lg px-2 border-primary border-[1px] text-primary text-xs right-[-4px] top-0 ">
                  {purchases.length}
                </div>
              )}
            </i>
          </div>
        </nav>
      </div>
    </header>
  );
}
