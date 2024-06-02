"use client"
import { FilterContext } from '@/context/filterContext'
import React, { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const ProductSearch = () => {
    //we can use the filters state from context directly in place of this use State but i have added debounce to imitate real scenaria
    const [search, setSearch] = useState("")
    const [query] = useDebounce(search, 500) // Debounce the search value
    const { handleFilters } = useContext(FilterContext)

    useEffect(() => {
        handleFilters({ search: query === "" ? null : query }) // Update filters with the debounced query
    }, [query])

    const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="flex flex-col gap-1 flex-1">
            <label htmlFor="product_query" className="hidden">ابحث عن منتج</label>
            <input
                type="text"
                id="product_query"
                name="product_query"
                value={search}
                onChange={handleUpdateSearch}
                className="w-full p-2 bg-white appearance-none rounded-md border text-md"
                placeholder="ادخل اسم المنتج..."
            />
        </div>
    )
}

export default ProductSearch
