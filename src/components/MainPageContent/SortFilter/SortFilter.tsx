import { Link } from "react-router-dom";

export default function SortFilter() {
  const page = 1;
  const pageSize = page + 1;
  return (
    <div className="bg-gray-300/40 py-4 px-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button className="h-8 px-4 text-center text-sm rounded-sm capitalize bg-primary text-white hover:bg-primary/80">
            Phổ biến
          </button>
          <button className="h-8 px-4 text-center text-sm rounded-sm capitalize bg-white text-black hover:bg-slate-100">
            Mới nhất
          </button>
          <button className="h-8 px-4 text-center text-sm rounded-sm capitalize bg-white text-black hover:bg-slate-100">
            Bán chạy
          </button>

          <select className="h-8 px-4 text-left rounded-sm text-sm capitalize  outline-none bg-white text-black hover:bg-slate-100">
            <option value="" className="bg-white text-black" disabled>
              Giá
            </option>
            <option value="price:asc" className="bg-white text-black">
              Giá: Thấp đến cao
            </option>
            <option value="price:desc" className="bg-white text-black">
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
                to="/"
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
                to="/"
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
