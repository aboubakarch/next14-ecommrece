import { CartContextProvider } from "./cartContext";
import { FilterContextProvider } from "./filterContext";
import { UserContextProvider } from "./userContext";

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <UserContextProvider>
            <CartContextProvider>
                <FilterContextProvider>
                    {children}
                </FilterContextProvider>
            </CartContextProvider>
        </UserContextProvider>
    );
};