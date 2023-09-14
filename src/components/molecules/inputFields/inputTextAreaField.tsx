type InputTextFieldProps = {
    callbackFn: (value: React.SetStateAction<string>) => void,
    label: string,
    required?: boolean,
    rows?: number,
    value: string,
}

export const InputTextAreaField = ({ label, value, callbackFn, required = true, rows = 1 }: InputTextFieldProps) => {
    return (
        <div className="mb-2 px-2">
            <div>
                <label className="pr-2">{label}</label>
            </div>
            <textarea
                required={required}
                className="py-1 px-2 lg:p-2 rounded shadow-xl w-[100%]"
                rows={rows}
                value={value}
                onChange={(e) => callbackFn(e.target.value)}
            />
        </div>
    )
};
