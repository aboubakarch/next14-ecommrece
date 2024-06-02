interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  labelHtmlFor?: string;
  error?: string;
}

interface ProductCardProps extends Product {
  index: number;
}

interface AddCartProps {
  productId: number;
  hasControls?: boolean;
}

interface LoadMoreProps {
  products: Product[];
}

interface RemoveCartProps {
  itemQuantity: number;
  id: number;
  productId: number;
}

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: React.ReactNode;
}
