type InputDateFieldProps = {
    callbackFn: (value: React.SetStateAction<string | undefined>) => void,
    label: string,
    required?: boolean,
    value: string,
}

export const InputDateField = ({ label, value, callbackFn, required = true }: InputDateFieldProps) => {
    return (
        <div className="mb-2 px-2">
            <div>
                <label className="pr-2">{label}</label>
            </div>
            <input
                required={required}
                className="py-1 px-2 lg:p-2 rounded shadow-xl w-[100%]"
                type="date"
                value={value}
                onChange={(e) => callbackFn(e.target.value)}
            />
        </div>
    )
};
