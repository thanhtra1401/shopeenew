import { Category } from "../types/category.type";
import { SuccessResponseApi } from "../types/utils.type";
import httpRequest from "../utils/https";

const categoriesApi = {
  getCategories: () => {
    return httpRequest.get<SuccessResponseApi<Category[]>>("categories");
  },
};
export default categoriesApi;
