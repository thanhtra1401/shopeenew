import { useEffect, useState } from "react";
import { Purchase } from "../../types/purchase.type";
import purchaseApi from "../../apis/purchase.api";
import { formatCurrency } from "../../utils";

export default function Cart() {
  const [cartList, setCartList] = useState<Purchase[]>([]);
  useEffect(() => {
    purchaseApi
      .getPurchases({ status: -1 })
      .then((data) => setCartList(data.data.data))
      .catch((error) => alert(error));
  }, [cartList.length]);
  //const [amount, setAmount] = useState(1);

  // const handleIncreaseAmount = (value: number, max: number) => {
  //   if (value < max) value++;
  // };
  // const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   const numberValue = value.replace(/[^0-9]/g, "");
  //   setAmount(Number(numberValue));
  // };

  return (
    <div className="bg-gray-200 py-4">
      <div className="container bg-white grid grid-cols-8 py-4 px-8 rounded-sm">
        <div className="col-span-4 flex items-center ">
          <input type="checkbox" name="product" className="w-4 h-4 " />
          <label htmlFor="product" className="mx-4">
            Sản phẩm
          </label>
        </div>
        <div className="col-span-1 text-gray-500 capitalize text-center">
          Đơn giá
        </div>
        <div className="col-span-1 text-gray-500 capitalize text-center">
          Số lượng
        </div>
        <div className="col-span-1 text-gray-500 capitalize text-center">
          Số tiền
        </div>
        <div className="col-span-1 text-gray-500 capitalize text-center">
          Thao tác
        </div>
      </div>
      {cartList.length > 0 &&
        cartList.map((item) => (
          <div
            className="container bg-white grid grid-cols-8 py-4 px-8 rounded-sm mt-2"
            key={item._id}
          >
            <div className="col-span-4 flex items-center ">
              <div>
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  name="product-item"
                />
              </div>

              <div className="flex-center">
                <img
                  src={item.product.image}
                  className="w-20 h-20 ml-4 border-[1px] border-gray-300"
                  alt={item.product.name}
                />
                <div className=" text-gray-800 ml-4 mr-12 text-sm">
                  {item.product.name}
                </div>
              </div>
            </div>
            <div className="col-span-1 flex-center text-gray-800">
              ₫{formatCurrency(item.price)}
            </div>
            <div className="col-span-1 flex-center text-gray-800">
              <div className=" border-gray-300 border-[1px] rounded-l-sm w-8 h-8 flex-center cursor-pointer">
                -
              </div>
              <input
                type="text"
                value={item.buy_count}
                className="border-gray-300 border-y-[1px] w-16 h-8 flex-center outline-none text-center placeholder-gray-800"
                // onChange={handleChangeAmount}
                placeholder="1"
              />
              {/* <div className=" border-gray-300 border-y-[1px] w-16 h-8 flex-center">
              1
            </div> */}
              <div className=" border-gray-300 border-[1px] rounded-r-sm w-8 h-8 flex-center cursor-pointer">
                +
              </div>
            </div>
            <div className="col-span-1 flex-center text-gray-800">
              ₫{formatCurrency(item.buy_count * item.price)}
            </div>
            <div className="col-span-1 flex-center text-gray-800 hover:text-primary cursor-pointer">
              Xóa
            </div>
          </div>
        ))}
    </div>
  );
}
