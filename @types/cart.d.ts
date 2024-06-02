interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Cart {
  cartItems: CartItem[];
  totalCost: number;
}
