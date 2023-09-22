import React from 'react';

type InputCheckboxFieldProps = {
    checked: boolean;
    onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    id: string;
}

export const InputCheckboxField = ({ checked, label, onChangeFn, id }: InputCheckboxFieldProps) => {
    return (
        <div className="mb-2 inline-flex align-center px-2">
            <div>
                <label htmlFor={id} className="pr-4">{label}</label>
            </div>
            <input
                aria-labelledby={id}
                className="py-0.5 px-1 mt-1 rounded shadow-xl"
                type="checkbox"
                name="confetti"
                value="show"
                checked={checked}
                onChange={onChangeFn}
                id={id}
            />
        </div>
    )
};
