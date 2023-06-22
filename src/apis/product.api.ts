import { Product, ProductList, ProductListConfig } from "../types/product.type";
import { SuccessResponseApi } from "../types/utils.type";
import httpRequest from "../utils/https";

const productApi = {
  getProducts: (params: ProductListConfig) =>
    httpRequest.get<SuccessResponseApi<ProductList>>("products", {
      params,
    }),

  getProductDetail: (id: string) =>
    httpRequest.get<SuccessResponseApi<Product>>(`products/${id}`),
};
export default productApi;
