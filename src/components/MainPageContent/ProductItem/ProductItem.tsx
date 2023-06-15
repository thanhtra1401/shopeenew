import { Link } from "react-router-dom";
import { formatCurrency, formatNumberToSocialStyle } from "../../../utils";
import ProductRating from "./ProductRating";

export default function ProductItem() {
  return (
    <Link to="/">
      <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src="https://www.sporter.vn/wp-content/uploads/2017/06/Ao-bong-da-manchester-united-san-nha-hang-viet-nam-1-1-800x800.jpg"
            alt="product"
            className="absolute top-0 left-0 h-full w-full bg-white object-cover"
          />
        </div>

        <div className="overflow-hidden p-2">
          <div className="min-h-[2rem] text-xs line-clamp-2">
            Áo MU 2022-2023
          </div>

          <div className="mt-3 flex items-center ">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span className="text-sm">{formatCurrency(5000000)}</span>
            </div>
            <div className="ml-1 truncate text-primary">
              <span className="text-xs">₫</span>
              <span className="text-sm">{formatCurrency(7000000)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-start">
            <ProductRating rating={4.5} />
            <div className="ml-2 text-sm">
              <span className="ml-1">Đã bán</span>
              <span>{formatNumberToSocialStyle(10000)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
