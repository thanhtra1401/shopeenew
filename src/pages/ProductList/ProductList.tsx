import { useEffect, useState } from "react";
import AsideFilter from "../../components/MainPageContent/AsideFilter/AsideFilter";
import ProductItem from "../../components/MainPageContent/ProductItem/ProductItem";
import SortFilter from "../../components/MainPageContent/SortFilter/SortFilter";
import productApi from "../../apis/product.api";
import useQueryParams from "../../hooks/useQueryParams";
import { Product } from "../../types/product.type";
import Pagination from "../../components/MainPageContent/Pagination/Pagination";
import categoriesApi from "../../apis/categories.api";
import { Category } from "../../types/category.type";

export default function ProductList() {
  type ProductListType = {
    productList: Product[];
    isLoading: boolean;
  };
  const initProductList: ProductListType = {
    productList: [],
    isLoading: true,
  };
  const queryParams = useQueryParams();
  const [products, setProducts] = useState<ProductListType>(initProductList);
  const [pageSize, setPageSize] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    page,
    limit,
    sort_by,
    order,
    category,
    price_max,
    price_min,
    rating_filter,
    name,
  } = queryParams;

  useEffect(() => {
    productApi
      .getProducts(queryParams)
      .then((res) => {
        setProducts({ productList: res.data.data.products, isLoading: false });
        setPageSize(res.data.data.pagination.page_size);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    page,
    limit,
    sort_by,
    order,
    category,
    price_max,
    price_min,
    rating_filter,
    name,
  ]);

  useEffect(() => {
    categoriesApi.getCategories().then((res) => {
      setCategories(res.data.data);
    });
  }, [category]);

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <AsideFilter queryConfig={queryParams} categories={categories} />
          </div>
          <div className="col-span-10">
            <SortFilter queryConfig={queryParams} pageSize={pageSize} />
            {products.isLoading && (
              <div className="flex-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 bg-primary "
                  viewBox="0 0 24 24"
                ></svg>
                Loading...
              </div>
            )}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {products.productList.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}

              {/* <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem /> */}
            </div>
            <Pagination queryConfig={queryParams} pageSize={pageSize} />
          </div>
        </div>
      </div>
    </div>
  );
}
