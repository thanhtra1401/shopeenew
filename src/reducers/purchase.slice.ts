import { createAsyncThunk } from "@reduxjs/toolkit";
import purchaseApi from "../apis/purchase.api";

export const addToCart = createAsyncThunk(
  "purchases/addToCart",
  async (body: { product_id: string; buy_count: number }) => {
    try {
      const res = await purchaseApi.addToCart(body);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
);
