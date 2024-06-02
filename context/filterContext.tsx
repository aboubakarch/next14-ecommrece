"use client"
import { createContext, useState } from "react";



export const filterContextDefault: FilterContextData = {
    filters: { search: null, range: null },
    handleFilters: () => { },
};

export const FilterContext = createContext<FilterContextData>(
    filterContextDefault
);

export function useFilterContextValue(): FilterContextData {
    const [filters, setFilters] = useState<{ search: string | null; range: string | null }>({
        search: null,
        range: null,
    });

    const handleFilters = (updates: Partial<{ search: string | null; range: string | null }>) => {
        setFilters(prevFilters => ({ ...prevFilters, ...updates }));
    };

    return {
        filters,
        handleFilters,
    };
}

// Provider component
export const FilterContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const filter = useFilterContextValue();
    return (
        <FilterContext.Provider value={filter}>
            {children}
        </FilterContext.Provider>
    );
};
