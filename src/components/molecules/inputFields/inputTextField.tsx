type InputTextFieldProps = {
    callbackFn: (value: React.SetStateAction<string>) => void,
    label: string,
    required?: boolean,
    value: string,
}

export const InputTextField = ({ label, value, callbackFn, required = true }: InputTextFieldProps) => {
    return (
        <div className="mb-2 px-2">
            <div>
                <label className="pr-2">{label}</label>
            </div>
            <input
                required={required}
                className="py-1 px-2 lg:p-2 rounded shadow-xl w-[100%]"
                type="text"
                value={value}
                onChange={(e) => callbackFn(e.target.value)}
            />
        </div>
    )
};
