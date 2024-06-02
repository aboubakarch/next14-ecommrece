"use server";

import HTTPService from "@/services/api";

const getProducts = async () => {
  try {
    const data: Product[] = await HTTPService.getInstance().getProducts();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export { getProducts };
