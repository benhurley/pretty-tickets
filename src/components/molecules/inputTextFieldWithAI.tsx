import { ScaleLoader } from 'react-spinners';

type InputTextFieldProps = {
    isLoading: boolean,
    inputCallbackFn: (value: React.SetStateAction<string>) => void,
    aiCallbackFn: (e :any) => void,
    label: string,
    required?: boolean,
    value: string,
}

export const InputTextFieldWithAI = ({ label, value, inputCallbackFn, aiCallbackFn, isLoading = false, required = true }: InputTextFieldProps) => {
    return (
        <div className="mb-2">
            <div className="inline-block">
                <label className="font-bold pr-3">{label}</label>
                <button className="bg-green-100 px-2 py-0.5 mb-2 rounded-xl text-xs shadow-xl font-bold transform hover:scale-105 transition-transform duration-300" onClick={aiCallbackFn}>
                    {isLoading ? <div className='min-w-[100px]'><ScaleLoader color="#000" height={5} /></div> : "Generate with AI" }
                </button>
            </div>
            <input
                required={required}
                className="py-0.5 px-1 rounded shadow-xl w-[100%]"
                type="text"
                value={value}
                onChange={(e) => inputCallbackFn(e.target.value)}
            />
        </div>
    )
};
