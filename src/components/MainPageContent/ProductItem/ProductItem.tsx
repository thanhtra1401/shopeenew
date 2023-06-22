import { Link } from "react-router-dom";
import { formatCurrency, formatNumberToSocialStyle } from "../../../utils";
import ProductRating from "./ProductRating";
import { Product } from "../../../types/product.type";

interface Props {
  product: Product;
}
export default function ProductItem({ product }: Props) {
  return (
    <Link to={`/${product._id}`}>
      <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src={product.image}
            alt="product"
            className="absolute top-0 left-0 h-full w-full bg-white object-cover"
          />
        </div>

        <div className="overflow-hidden p-2">
          <div className="min-h-[2rem] text-xs line-clamp-2">
            {product.name}
          </div>

          <div className="mt-3 flex items-center ">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span className="text-sm">
                {formatCurrency(product.price_before_discount)}
              </span>
            </div>
            <div className="ml-1 truncate text-primary">
              <span className="text-xs">₫</span>
              <span className="text-sm">{formatCurrency(product.price)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-start">
            <ProductRating rating={product.rating} />
            <div className="ml-2 text-sm">
              <span className="ml-1">Đã bán </span>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
