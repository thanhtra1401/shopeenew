import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { ProductListConfig } from "../../../types/product.type";
import { omit } from "lodash";

type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};

interface Props {
  queryConfig: QueryConfig;
  pageSize: number;
}

export default function SortFilter({ queryConfig, pageSize }: Props) {
  const { sort_by = "createdAt", order } = queryConfig;
  const navigate = useNavigate();
  const page = Number(queryConfig.page) || 1;
  const handleSort = (
    sortByValue: Exclude<QueryConfig["sort_by"], undefined>
  ) => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
          },
          ["order"]
        )
      ).toString(),
    });
  };
  const handleSortPrice = (
    orderValue: Exclude<QueryConfig["order"], undefined>
  ) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        sort_by: "price",
        order: orderValue,
      }).toString(),
    });
  };
  return (
    <div className="bg-gray-300/40 py-4 px-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={`h-8 px-4 text-center text-sm rounded-sm capitalize ${
              sort_by === "view"
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white text-black hover:bg-slate-100"
            }`}
            onClick={() => handleSort("view")}
          >
            Phổ biến
          </button>
          <button
            className={`h-8 px-4 text-center text-sm rounded-sm capitalize ${
              sort_by === "createdAt"
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white text-black hover:bg-slate-100"
            }`}
            onClick={() => handleSort("createdAt")}
          >
            Mới nhất
          </button>
          <button
            className={`h-8 px-4 text-center text-sm rounded-sm capitalize ${
              sort_by === "sold"
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white text-black hover:bg-slate-100"
            }`}
            onClick={() => handleSort("sold")}
          >
            Bán chạy
          </button>

          <select
            className={`h-8 px-4 text-left rounded-sm text-sm capitalize  outline-none ${
              sort_by === "price"
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white text-black hover:bg-slate-100"
            }`}
            value={order || ""}
            onChange={(e) => handleSortPrice(e.target.value)}
          >
            <option value="" className="bg-white text-black">
              Giá
            </option>
            <option value="asc" className="bg-white text-black">
              Giá: Thấp đến cao
            </option>
            <option value="desc" className="bg-white text-black">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className="flex items-center">
          <div className="mr-4">
            <span className="text-primary">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="flex-center ml-2">
            {page === 1 ? (
              <span className="flex-center h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                <i className="fa-solid fa-chevron-left text-gray-300"></i>
              </span>
            ) : (
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString(),
                  }).toString(),
                }}
                className="flex-center h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100"
              >
                <i className="fa-solid fa-chevron-left "></i>
              </Link>
            )}

            {page === pageSize ? (
              <span className="flex-center h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                <i className="fa-solid fa-chevron-right text-gray-300"></i>
              </span>
            ) : (
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString(),
                  }).toString(),
                }}
                className="flex-center h-8 cursor-pointer rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100"
              >
                <i className="fa-solid fa-chevron-right "></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
