/* eslint-disable react/jsx-no-target-blank */

import Me from '../atoms/me-reversed.webp';

export const Footer = () => {
    return (
        <div className=" w-full fixed bottom-0 text-sm bg-white bg-opacity-90 z-20 px-4">
            <div className="flex justify-center items-center align-center mx-auto text-gray-800 ">
                <div
                    className="flex place-items-center gap-1 py-2"
                >
                    By
                    <a
                        className="hover:underline mr-1"
                        href='https://justben.fyi'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        justben.fyi
                    </a>
                    <img
                        src={Me}
                        alt="justben.fyi logo"
                        width={75}
                        height={24}
                    />
                    <div>
                    </div>
                    <a
                        className="underline"
                        href='https://pay.justben.fyi'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Donate
                    </a>
                </div>
            </div>
        </div>
    )
}