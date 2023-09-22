type InputTimeFieldProps = {
    callbackFn: (value: React.SetStateAction<string>) => void,
    label: string,
    required?: boolean,
    value: string,
}

export const InputTimeField = ({ label, value, callbackFn, required = true }: InputTimeFieldProps) => {
    return (
        <div className="mb-2 px-2">
            <div>
                <label htmlFor={label} className="pr-2">{label}</label>
            </div>
            <input
                aria-labelledby={label}
                required={required}
                className="py-1 px-2 lg:p-2 rounded shadow-xl w-[100%]"
                type="time"
                value={value}
                onChange={(e) => callbackFn(e.target.value)}
            />
        </div>
    )
};
