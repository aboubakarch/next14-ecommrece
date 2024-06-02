import React, { Children } from 'react'



const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, children, ...props }) => {
    return (
        <button
            className="w-full flex items-center justify-center gap-3 bg-primary text-secondary flex-1 p-2 text-md rounded-md hover:brightness-75"
            {...props}
            type="submit"
        >
            {children || "Button"}
            {loading && <div className="loader_simple"></div>}

        </button>)
}

export default SubmitButton