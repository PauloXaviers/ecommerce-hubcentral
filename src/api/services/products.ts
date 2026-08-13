import { type Product } from "../../types/product";
import axios, { type AxiosResponse } from "axios";

interface ProductListResponse {
  skip: number;
  limit: number;
  products: Product[];
  total: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

const selectedItems = "select=id,title,description,price,category,rating,stock,images";

export const getAllProducts = async (skip: number): Promise<ApiResponse<Product[]>> => {
  try {
    const response: AxiosResponse<ProductListResponse> = await axios.get(
      `https://dummyjson.com/products?${selectedItems}&limit=10&skip=${skip.toString()}`
    );
    return { data: response.data.products, status: response.status };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
  try {
    const response: AxiosResponse<Product> = await axios.get(
      `https://dummyjson.com/products/${id}?${selectedItems}`
    );
    return { data: response.data, status: response.status };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProductByCategory = async (
  query: string,
  skip: number
): Promise<ApiResponse<Product[]>> => {
  try {
    const response: AxiosResponse<ProductListResponse> = await axios.get(
      `https://dummyjson.com/products/category/${query}?${selectedItems}&limit=10&skip=${skip.toString()}`
    );
    return { data: response.data.products, status: response.status };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchProducts = async (
  query: string,
  skip: number
): Promise<ApiResponse<Product[]>> => {
  try {
    const response: AxiosResponse<ProductListResponse> = await axios.get(
      `https://dummyjson.com/products/search?q=${query}&${selectedItems}&limit=10&skip=${skip.toString()}`
    );
    return { data: response.data.products, status: response.status };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
