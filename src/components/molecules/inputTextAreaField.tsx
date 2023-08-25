type InputTextFieldProps = {
    callbackFn: (value: React.SetStateAction<string>) => void,
    label: string,
    required?: boolean,
    value: string,
}

export const InputTextAreaField = ({ label, value, callbackFn, required = true }: InputTextFieldProps) => {
    return (
        <div className="mb-2">
            <div>
                <label className="pr-2">{label}</label>
            </div>
            <textarea
                required={required}
                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                rows={1}
                value={value}
                onChange={(e) => callbackFn(e.target.value)}
            />
        </div>
    )
};
