import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { ProductListConfig } from "../../../types/product.type";
import { Category } from "../../../types/category.type";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterPriceSchema } from "../../../utils/schema";

type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};

interface Props {
  queryConfig: QueryConfig;
  categories: Category[];
}
type FormData = {
  price_min: string;
  price_max: string;
};

export default function AsideFilter({ queryConfig, categories }: Props) {
  const navigate = useNavigate();
  const { category } = queryConfig;
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(filterPriceSchema),
  });
  const onSubmit = handleSubmit((data) =>
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min,
      }).toString(),
    })
  );
  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter),
      }).toString(),
    });
  };
  const handleDeleteFilter = () => {
    setValue("price_max", "");
    setValue("price_min", "");
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
          },
          ["category", "price_max", "price_min", "rating_filter"]
        )
      ).toString(),
    });
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   // if (/^\d+$/.test(value) || value === "") {
  //   // }
  // };

  return (
    <div className="py-4">
      <Link
        to={{
          pathname: "/",
          search: createSearchParams(
            omit(
              {
                ...queryConfig,
              },
              ["category"]
            )
          ).toString(),
        }}
        className="flex items-center font-bold"
      >
        <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>

      <div className="my-4 h-[1px] bg-gray-300" />
      <ul>
        {categories.map((categoryItem) => (
          <li className="py-2 pl-2 hover:text-gray-500" key={categoryItem._id}>
            <Link
              to={{
                pathname: "/",
                search: createSearchParams(
                  omit(
                    {
                      ...queryConfig,
                      category: categoryItem._id,
                    },
                    ["page"]
                  )
                ).toString(),
              }}
              className={`relative px-2 ${
                category === categoryItem._id
                  ? "font-semibold text-primary"
                  : ""
              } `}
            >
              {category === categoryItem._id && (
                <svg
                  viewBox="0 0 4 7"
                  className="absolute top-1 left-[-10px] h-2 w-2 fill-current"
                >
                  <polygon points="4 3.5 0 0 0 7" />
                </svg>
              )}
              {categoryItem.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/" className="mt-4 flex items-center font-bold uppercase">
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="mr-3 h-4 w-3 fill-current stroke-current"
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>

      <div className="my-4 h-[1px] bg-gray-300" />

      <div className="my-5">
        <div>Khoảng Giá</div>
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-2 flex items-start">
            <input
              type="text"
              className="grow p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
              placeholder="₫ TỪ"
              {...register("price_min")}
            />
            <div className="mx-2 mt-2 shrink-0">-</div>
            <input
              type="text"
              className="grow p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
              placeholder="₫ ĐẾN"
              {...register("price_max")}
            />
          </div>
          {errors && (
            <span className="text-xs text-red-600">
              {errors.price_min?.message || errors.price_max?.message}
            </span>
          )}
          <button
            className="py-2 px-3 w-full uppercase bg-primary rounded-sm text-white"
            type="submit"
          >
            Áp dụng
          </button>
        </form>
      </div>

      <div className="my-4 h-[1px] bg-gray-300" />

      <div>Đánh giá</div>
      {/* <RatingStars queryConfig={queryConfig} /> */}
      <ul className="py-1 pl-2">
        <li className="py-1 pl-2">
          <button
            onClick={() => handleFilterStar(5)}
            className="flex items-center text-sm mt-4"
          >
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
          </button>
          <button
            onClick={() => handleFilterStar(4)}
            className="flex items-center text-sm mt-4"
          >
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <span className="ml-2">Trở lên</span>
          </button>
          <button
            onClick={() => handleFilterStar(3)}
            className="flex items-center text-sm mt-4"
          >
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <span className="ml-2">Trở lên</span>
          </button>
          <button
            onClick={() => handleFilterStar(2)}
            className="flex items-center text-sm mt-4"
          >
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <span className="ml-2">Trở lên</span>
          </button>
          <button
            onClick={() => handleFilterStar(1)}
            className="flex items-center text-sm mt-4"
          >
            <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <i className="fa-solid fa-star text-gray-400 mr-2"></i>
            <span className="ml-2">Trở lên</span>
          </button>
        </li>
      </ul>
      <div className="my-4 h-[1px] bg-gray-300" />

      <button
        className="py-2 px-3 w-full uppercase bg-primary rounded-sm text-white"
        onClick={handleDeleteFilter}
      >
        Xóa tất cả
      </button>
    </div>
  );
}
