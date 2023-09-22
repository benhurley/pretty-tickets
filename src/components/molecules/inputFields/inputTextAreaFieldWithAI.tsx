import { GenerateWithAIButton } from '../buttons/generateWithAIButton';

type InputTextFieldProps = {
    isLoading: boolean,
    inputCallbackFn: (value: React.SetStateAction<string>) => void | null,
    aiCallbackFn: (e: any) => void,
    aiButtonCopy?: string | undefined;
    label: string,
    required?: boolean,
    value: string,
    rows?: number,
    instructions?: string
};

export const InputTextAreaFieldWithAI = ({ label, value, inputCallbackFn, aiCallbackFn, isLoading = false, required = true, aiButtonCopy = undefined, rows = 4, instructions = undefined }: InputTextFieldProps) => {
    return (
        <div className="mb-2 pt-2 px-2">
            <div className="flex items-center justify-between">
                <label htmlFor={label} className="pr-3">{label}</label>
                <GenerateWithAIButton
                    copy={aiButtonCopy}
                    isLoading={isLoading}
                    aiCallbackFn={aiCallbackFn}
                />
            </div>
            {instructions && <p className="text-xs mt-3 font-semibold">{instructions}</p>}
            <textarea
                aria-labelledby={label}
                required={required}
                className="py-2 px-3 rounded shadow w-full mt-2"
                rows={rows}
                value={value}
                onChange={(e) => inputCallbackFn(e.target.value)}
                maxLength={300}
            />
        </div>
    );
};
