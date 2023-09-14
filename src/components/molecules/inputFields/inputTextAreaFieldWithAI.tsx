import { GenerateWithAIButton } from '../buttons/generateWithAIButton';

type InputTextFieldProps = {
    isLoading: boolean,
    inputCallbackFn: (value: React.SetStateAction<string>) => void | null,
    aiCallbackFn: (e: any) => void,
    aiButtonCopy?: string | undefined;
    label: string,
        required ?: boolean,
        value: string,
};

export const InputTextAreaFieldWithAI = ({ label, value, inputCallbackFn, aiCallbackFn, isLoading = false, required = true, aiButtonCopy = undefined }: InputTextFieldProps) => {
    return (
        <div className="mb-2 pt-2 px-2">
            <div className="flex items-center justify-between">
                <label className="pr-3">{label}</label>
                <GenerateWithAIButton
                    copy={aiButtonCopy}
                    isLoading={isLoading}
                    aiCallbackFn={aiCallbackFn}
                />
            </div>
            <textarea
                required={required}
                className="py-2 px-3 rounded shadow w-full mt-2"
                rows={4}
                value={value}
                onChange={(e) => inputCallbackFn(e.target.value)}
            />
        </div>
    );
};
