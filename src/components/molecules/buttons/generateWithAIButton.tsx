import { useState, type FunctionComponent } from "react";

import { PulseLoader } from "react-spinners";

type GenerateWithAIButtonProps = {
    isLoading: boolean;
    aiCallbackFn: (e: any) => void;
}

export const GenerateWithAIButton: FunctionComponent<GenerateWithAIButtonProps> = ({isLoading, aiCallbackFn}) => {
    const [wasAIButtonClicked, setWasAIButtonClicked] = useState(false);

    const handleClick = (e: any) => {
        setWasAIButtonClicked(true);
        aiCallbackFn(e);
    };
    return (
        <button
            disabled={wasAIButtonClicked || isLoading}
            className={`
            ${wasAIButtonClicked ? !isLoading ? 'bg-blue-100' : 'bg-gray-100' : 'bg-green-100'} font-semibold px-4 py-1 rounded-full text-xs shadow transition-all duration-300 ${wasAIButtonClicked ? 'scale-100' : 'hover:scale-105 active:scale-100'
                }`}
            onClick={handleClick}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <PulseLoader color="#000000" size={4} />
                    <span className="ml-2 px-1">Loading...</span>
                </div>
            ) : wasAIButtonClicked ? (
                'Using AI ✓'
            ) : (
                'Generate with AI'
            )}
        </button>
    )
}