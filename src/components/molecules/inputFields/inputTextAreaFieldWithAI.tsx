import { useState } from 'react';
import { PulseLoader } from "react-spinners";

type InputTextFieldProps = {
    isLoading: boolean,
    inputCallbackFn: (value: React.SetStateAction<string>) => void,
    aiCallbackFn: (e: any) => void,
    label: string,
    required?: boolean,
    value: string,
};

export const InputTextAreaFieldWithAI = ({ label, value, inputCallbackFn, aiCallbackFn, isLoading = false, required = true }: InputTextFieldProps) => {
    const [wasAIButtonClicked, setWasAIButtonClicked] = useState(false);

    const handleClick = (e: any) => {
        setWasAIButtonClicked(true);
        aiCallbackFn(e);
    };

    return (
        <div className="mb-2 pt-2 px-2">
            <div className="flex items-center">
                <label className="pr-3">{label}</label>
                <button
                    disabled={wasAIButtonClicked || isLoading}
                    className={`
                        ${wasAIButtonClicked ? !isLoading ? 'bg-blue-100' : 'bg-gray-100' : 'bg-green-100'} font-bold px-4 py-1 rounded-xl text-xs shadow transition-all duration-300 ${wasAIButtonClicked ? 'scale-100' : 'hover:scale-105 active:scale-100'
                        }`}
                    onClick={handleClick}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <PulseLoader color="#000000" size={4} />
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : wasAIButtonClicked ? (
                        'Using AI ✓'
                    ) : (
                        'Generate with AI'
                    )}
                </button>
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
