import React from 'react';

export type DropdownItem = {
    name: string,
    value: string,
}

type InputDropdownFieldProps = {
    callbackFn: (value: string) => void,
    label: string,
    required?: boolean,
    value: string,
    inputList: DropdownItem[]
}

export const InputDropdownField = ({ label, value, callbackFn, required = true, inputList }: InputDropdownFieldProps) => {
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        callbackFn(selectedValue);
    };

    return (
        <div className="mb-2 px-2">
            <label htmlFor="dropdown">{label}</label>
            <select name="dropdown" id="dropdown" className="bg-white py-1 px-2 lg:p-2 rounded shadow-xl w-[100%]" value={value} onChange={handleOptionChange}>
                {inputList.map((item: DropdownItem, index: number) => (
                    <option key={index} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
