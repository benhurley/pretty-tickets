import React from 'react';

type Texture = {
    name: string,
    path: string,
}

type InputDropdownFieldProps = {
    callbackFn: (value: string) => void,
    label: string,
    required?: boolean,
    value: string,
    inputList: Texture[]
}

export const InputDropdownField = ({ label, value, callbackFn, required = true, inputList }: InputDropdownFieldProps) => {
    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        callbackFn(selectedValue);
    };

    return (
        <div className="mb-2 px-2">
            <label htmlFor="dropdown">{label}</label>
            <select name="dropdown" id="dropdown" className="py-1 px-2 lg:p-2 rounded shadow-xl w-[100%]" value={value} onChange={handleOptionChange}>
                {inputList.map((item: Texture, index: number) => (
                    <option key={index} value={item.path}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
