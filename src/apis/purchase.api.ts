import { Purchase, PurchaseListStatus } from "../types/purchase.type";
import { SuccessResponseApi } from "../types/utils.type";
import httpRequest from "../utils/https";

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return httpRequest.post<SuccessResponseApi<Purchase>>(
      "purchases/add-to-cart",
      body
    );
  },
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return httpRequest.get<SuccessResponseApi<Purchase[]>>("purchases", {
      params,
    });
  },
};
export default purchaseApi;
