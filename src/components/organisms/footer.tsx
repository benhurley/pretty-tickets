/* eslint-disable react/jsx-no-target-blank */
export const Footer = () => {
    return (
        <div className=" w-full fixed bottom-0 text-sm bg-white bg-opacity-90 z-20 px-4">
            <div className="flex items-center justify-between align-center max-w-[450px] mx-auto text-gray-800 ">
                <a className="hover:underline" href="https://github.com/benhurley/fancy-tickets" target="_blank" rel="noreferrer">Contribute</a>
                <p className="text-center p-2">Created with ♥ by <a className="hover:underline" target="_blank" rel="no-repeat" href="https://justben.fyi">Ben</a>, 2023.</p>
                <a className="hover:underline" href="https://github.com/sponsors/benhurley" target="_blank" rel="noreferrer">Sponsor</a>
            </div>
        </div>
    )
}