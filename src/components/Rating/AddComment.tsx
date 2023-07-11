import { useForm } from "react-hook-form";
import { Product } from "../../types/product.type";
import StarRating from "./StarRating";
import { useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ratingSchema } from "../../utils/schema";
import axios from "axios";

export default function AddComment({
  visible,
  onClose,
  product,
  setLoadCm,
}: {
  visible: boolean;
  onClose: () => void;
  product: Product;
  setLoadCm: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };
  // type rateType = {
  //   comment: string;
  //   email: string;
  //   gender: string;
  //   name: string;
  //   phone_number: string;
  //   star: number;
  // };

  type formDataType = {
    comment: string;
    email: string;
    gender: string;
    name: string;
    phone_number: string;
  };

  const [star, setStar] = useState(0);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<formDataType>();

  // const [comments, setComments] = useState(
  //   JSON.parse(localStorage.getItem("comments") || "[]")
  // );

  // useEffect(() => {
  //   const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  //   if (comments.length > 0) setComments(comments);
  // }, []);

  // let comments: rateType[] = [];
  // if (commentsJSON) {
  //   comments = JSON.parse(commentsJSON);
  // }
  // console.log("comments", comments);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(
        "http://127.0.0.1:8081/api/task2",
        {
          product_id: "4",
          user_id: "1",
          review: data.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoadCm((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }

    // const newComments = [...comments, { ...data, star: star }];
    // console.log(data.comment);

    // setComments(newComments);
    // localStorage.setItem("comments", JSON.stringify(newComments));
    onClose();
  });

  if (!visible) return null;

  return (
    <div
      onClick={handleClose}
      id="container"
      className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex-center z-10 overflow-hidden}`}
    >
      <div className="relative w-full max-w-xl max-h-full ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              Đánh giá sản phẩm
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <form className="p-6 space-y-6 " onSubmit={onSubmit}>
            <div className="flex-col flex-center">
              <img src={product.image} className="w-28" alt={product.name} />
              <span className="text-gray-700 font-bold my-4">
                {product.name}
              </span>
              <StarRating size={8} star={star} setStar={setStar} />
            </div>
            <div className="flex-col flex">
              <textarea
                rows={3}
                className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                {...register("comment")}
              ></textarea>
              <div className="mt-4 hidden">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  className="cursor-pointer "
                  {...register("gender")}
                />
                <label htmlFor="male" className="ml-2 text-sm cursor-pointer ">
                  Anh
                </label>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  className="ml-8 cursor-pointer"
                  {...register("gender")}
                />
                <label htmlFor="female" className="ml-2 text-sm cursor-pointer">
                  Chị
                </label>
              </div>
              <div className="mt-4 hidden ">
                <div className="flex justify-between">
                  <div className="flex flex-col w-[50%] mr-2 ">
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      className="outline-none w-full  border-gray-400 border-[1px] rounded-md px-4 py-2 text-sm "
                      {...register("name")}
                    />
                    <span className="text-sm text-red-500 w-full mt-2">
                      {errors.name?.message}
                    </span>
                  </div>
                  <div className="flex flex-col w-[50%] ml-2">
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="outline-none w-full  border-gray-400 border-[1px] rounded-md px-4 py-2 text-sm"
                      {...register("phone_number")}
                    />
                    <span className="text-sm text-red-500 w-full mt-2">
                      {errors.phone_number?.message}
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Nhập email (để nhận thông báo phản hồi)"
                  className=" mt-4 outline-none w-full border-gray-400 border-[1px] rounded-md px-4 py-2 text-sm "
                  {...register("email")}
                />
                <span className="text-sm text-red-500 w-full mt-2">
                  {errors.email?.message}
                </span>
              </div>

              <button
                type="submit"
                className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Hoàn tất
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
