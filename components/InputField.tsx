import clsx from 'clsx'
import React from 'react'

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, labelClassName, labelHtmlFor, error, ...inputProps }, ref) => {
        return (
            <div className="mb-4">
                {label && (
                    <label
                        className={clsx("block mb-2 text-md", labelClassName, {
                            'text-red-500': error
                        })}
                        htmlFor={labelHtmlFor || inputProps.id}
                    >
                        {label}
                    </label>
                )}
                <input
                    {...inputProps}
                    ref={ref}
                    className={clsx("w-full p-2 bg-white appearance-none rounded-md border text-md", inputProps.className, {
                        'border-red-500': error
                    })}
                />
                <div className={clsx("overflow-hidden transition-[max-height] duration-300 ease-in-out", { 'max-h-16': error, 'max-h-0': !error })}>
                    {error && <p className="text-red-500 text-sm mt-1 opacity-100 transition-opacity duration-500">{error}</p>}
                </div>
            </div>
        );
    }
);
InputField.displayName = 'InputField';

export default InputField;
