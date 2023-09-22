import React from 'react';

type InputColorFieldProps = {
    callbackFn: (value: React.SetStateAction<string>) => void;
    label: string;
    required?: boolean;
    value: string;
}

export const InputColorField = ({ label, value, callbackFn, required = true }: InputColorFieldProps) => {
    return (
        <div className="mb-2 text-center inline-flex">
            <div>
                <label htmlFor={label} className="pr-2">{label}</label>
            </div>
            <input
                aria-labelledby={label}
                aria-required={required}
                className="py-0.5 px-1 rounded shadow-xl hover:cursor-pointer"
                type="color"
                value={value}
                onChange={(e) => callbackFn(e.target.value)}
                id={label}
            />
        </div>
    )
};
