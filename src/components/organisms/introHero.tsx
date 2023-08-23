export const IntroHero = () => {
    return (
        <div className="max-w-[900px] px-6 pt-10 lg:pt-4 animate-in fade-in zoom-in ease-in-out">
            <div>
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-center text-gray-700 mb-2 inline-block">
                    Pretty Tickets
                </h1>
                <img className="inline-block ml-1 sm:ml-2 -mt-10 animate-in spin-in ease-in-out duration-1000" width={75} src="/logo128.png" alt="ticket" />
            </div>
            <h2 className="text-[20px] text-gray-700 font-bold italic ">Elevate Your Ticketing Experience</h2>
            <p className="mt-4 mb-6 sm:my-6">Transform that ordinary event booking into an elegant, tailor-made online ticket that's perfect for gifting and sharing.</p>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md text-center sm:flex-grow md:w-[200px] md:h-[120px] w-full"> {/* Set fixed width and height */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-left">1. Add Details</h3>
                    <p className="text-gray-600 text-left">Input the event details and add your personal touches.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center mt-1 md:mt-0 md:flex-grow md:w-[200px] md:h-[120px] w-full"> {/* Set fixed width and height */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-left">2. Preview</h3>
                    <p className="text-gray-600 text-left">Get a real-time look at your new ticket before finalizing.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center mt-1 md:mt-0 md:flex-grow md:w-[200px] md:h-[120px] w-full"> {/* Set fixed width and height */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-left">3. Create and Share!</h3>
                    <p className="text-gray-600 text-left">Submit and generate your unique link for its lucky recipient.</p>
                </div>
            </div>
        </div>
    )
}
