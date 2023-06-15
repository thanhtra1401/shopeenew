import AsideFilter from "../../components/MainPageContent/AsideFilter/AsideFilter";
import ProductItem from "../../components/MainPageContent/ProductItem/ProductItem";
import SortFilter from "../../components/MainPageContent/SortFilter/SortFilter";

export default function ProductList() {
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <AsideFilter />
          </div>
          <div className="col-span-10">
            <SortFilter />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
