import { useEffect, useState } from "react";
import ProductRating from "../MainPageContent/ProductItem/ProductRating";
import AddComment from "./AddComment";
import { Product } from "../../types/product.type";

export default function Rating({ product }: { product: Product }) {
  type comment = {
    comment: string;
    email: string;
    gender: string;
    name: string;
    phone_number: string;
    star: number;
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");

  return (
    <div>
      <div className="mt-6 border-gray-300 border-y-[1px] flex items-center justify-between">
        <div className="mx-12 flex-center flex-col p-4 ">
          <div className="capitalize mt-2">Đánh giá trung bình</div>
          <div className="mt-2 text-[50px] font-[500] text-red-600">
            {" "}
            {product.rating}/5
          </div>
          <ProductRating rating={product.rating} />
        </div>
        <div className="flex-center flex-col mr-14">
          <div>Bạn đã dùng sản phẩm này?</div>
          <button
            className="py-2 px-3 bg-primary text-white rounded-md mt-2 uppercase"
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Gửi đánh giá
          </button>
          <AddComment
            visible={showModal}
            onClose={handleClose}
            product={product}
          />
        </div>
      </div>

      {comments.length > 0 &&
        comments.map((comment: comment) => (
          <div className="mt-6 flex">
            <div
              className="w-14 h-14 rounded-full"
              style={{
                backgroundImage:
                  "url(https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-logo-mu-hinh-nen-logo-mu.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* <img
              src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-logo-mu-hinh-nen-logo-mu.jpg"
              alt="ava"
              className="rounded-[50%] w-full h-full  "
            /> */}
            </div>
            <div className="flex-col ml-4">
              <div className="font-bold">{comment.name}</div>
              <ProductRating rating={comment.star} />
              <p className="">{comment.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
