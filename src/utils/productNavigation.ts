import type { NavigateFunction, SetURLSearchParams } from "react-router-dom";

type FetchType =
  | { type: "product"; query: number }
  | { type: "category"; query: string }
  | { type: "search"; query: string };

export const handleProductNavigation = (
  navigate: NavigateFunction,
  setSearchParams: SetURLSearchParams,
  fetchType: FetchType,
  pathname: string,
) => {
  const pageProducts = "/products";
  const isPageProducts = pathname === pageProducts;
  const { type, query } = fetchType;

  if (isPageProducts) {
    setSearchParams({ type: type, query: type === "product" ? query.toString() : query });
  } else {
    const queryParams = new URLSearchParams();
    queryParams.set("type", type);
    queryParams.set("query", type === "product" ? query.toString() : query);
    navigate(`${pageProducts}?${queryParams.toString()}`);
  }
};
