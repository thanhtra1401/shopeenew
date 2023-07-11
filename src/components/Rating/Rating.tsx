import { useEffect, useState } from "react";
import ProductRating from "../MainPageContent/ProductItem/ProductRating";
import AddComment from "./AddComment";
import { Product } from "../../types/product.type";
import axios from "axios";

export default function Rating({ product }: { product: Product }) {
  type comment = {
    product_id: string;
    review: string;
    task2: string;
    user_id: string;
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const [comments, setComments] = useState<comment[]>([]);
  const [loadCm, setLoadCm] = useState(0);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8081/api/get/4");
        setComments(res.data);
        setLoadCm(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    loadComments();
  }, [loadCm]);
  //const comments = JSON.parse(localStorage.getItem("comments") || "[]");

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
            setLoadCm={setLoadCm}
          />
        </div>
      </div>

      {comments.length > 0 &&
        comments.map((comment: comment, index: number) => (
          <div className="mt-6 grid grid-cols-12 " key={index}>
            <div
              className="w-14 h-14 rounded-full col-span-1 m-auto"
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
            <div className="flex-col ml-4 col-span-11">
              <div className="font-bold">{comment.user_id}</div>
              <ProductRating rating={5} />
              {comment.task2 !== "0" && (
                <div className="text-xs text-red-500 mt-[1px]">
                  ! spam {comment.task2}
                </div>
              )}
              <p className="">{comment.review}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
