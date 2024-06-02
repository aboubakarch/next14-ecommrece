interface UserContextData {
  token: string | null;
  handleToken: (token: string | null) => void;
}
interface CartContextData {
  cart: Cart | null;
  handleCart: (cart: Cart | null) => void;
}

interface FilterContextData {
  filters: { search: string | null; range: string | null };
  handleFilters: (
    updates: Partial<{ search: string | null; range: string | null }>
  ) => void;
}
