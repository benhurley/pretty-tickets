type InputTextFieldProps = {
    checked: boolean,
    onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
}

export const InputCheckboxField = ({ checked, label, onChangeFn }: InputTextFieldProps) => {
    return (
        <div className="mb-2 inline-flex align-center px-2">
            <div>
                <label htmlFor={label} className="pr-4">{label}</label>
            </div>
            <input
                aria-labelledby={label}
                className="py-0.5 px-1 mt-1 rounded shadow-xl"
                type="checkbox"
                name="confetti"
                value="show"
                checked={checked}
                onChange={onChangeFn}
            />
        </div>
    )
};
