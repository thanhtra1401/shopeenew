import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import productApi from "../../apis/product.api";
import { Product } from "../../types/product.type";
import ProductRating from "../../components/MainPageContent/ProductItem/ProductRating";
import { formatCurrency, formatNumberToSocialStyle } from "../../utils";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    price_before_discount: 0,
    description: "",
    category: {
      _id: "",
      name: "",
    },
    images: [],
    image: "",
    rating: 0,
    quantity: 0,
    sold: 0,
    view: 0,
    createAt: "",
    updateAt: "",
    price: 0,
  });
  useEffect(() => {
    id &&
      productApi.getProductDetail(id).then((res) => setProduct(res.data.data));
  }, [id]);

  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);
  const handleChooseImage = (img: string) => {
    setActiveImage(img);
  };

  const [amount, setAmount] = useState(1);
  const handleIncrease = () => {
    amount < product.quantity && setAmount(amount + 1);
  };
  const handleDecrease = () => {
    amount > 1 && setAmount(amount - 1);
  };

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="bg-white p-4 shadow">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover"
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                {product.images.slice(0, 5).map((img) => {
                  const isActive = img === activeImage;
                  return (
                    <div
                      className="relative w-full pt-[100%]"
                      key={img}
                      onMouseEnter={() => handleChooseImage(img)}
                      aria-hidden="true"
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className="absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-primary" />
                      )}
                    </div>
                  );
                })}

                <button className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>
              <div className="mt-8 flex items-center">
                <div className="flex items-center">
                  <span className="mr-1 border-b border-b-primary text-primary">
                    {product.rating}
                  </span>
                  <ProductRating rating={product.rating} />
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500"> Đã bán</span>
                </div>
              </div>

              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">
                  ₫{formatCurrency(product.price_before_discount)}
                </div>
                <div className="ml-3 text-3xl font-medium text-primary">
                  ₫{formatCurrency(product.price)}
                </div>
                <div className="ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white">
                  {Math.round(
                    ((product.price_before_discount - product.price) /
                      product.price_before_discount) *
                      100
                  )}
                  % giảm
                </div>
              </div>

              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">Số lượng</div>
                <div className="ml-10 flex items-center">
                  <button
                    className={`flex h-8 w-8 text-gray-500 items-center justify-center rounded-l-sm border-gray-300/80 border-[1px] ${
                      amount === 1 && "opacity-50 cursor-default"
                    }`}
                    onClick={handleDecrease}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <div className="h-8 w-14 flex-center text-gray-500 border-gray-300/80 border-[1px]">
                    {amount}
                  </div>
                  <button
                    className={`flex h-8 w-8 text-gray-500 items-center justify-center rounded-r-sm border-gray-300/80 border-[1px] ${
                      amount === product.quantity && "opacity-50 cursor-default"
                    }`}
                    onClick={handleIncrease}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div className="ml-6 text-sm text-gray-500">
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <button className=" px-3 py-2 border-[1px] border-primary rounded-sm text-primary bg-[#FFF5F1] hover:opacity-90">
                  <i className="fa-solid fa-cart-plus mr-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <button className=" px-3 py-2 ml-2 capitalize border-[1px] border-primary rounded-sm text-white bg-primary hover:opacity-90">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mt-6 bg-white p-4 shadow">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mt-6 mb-4 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
