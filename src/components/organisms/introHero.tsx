export const IntroHero = () => {
    return (
        <div className="max-w-[900px] px-6 pt-16 sm:pt-10 lg:pt-4">
            <>
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-center text-gray-800 mb-2 inline-block">
                    Pretty Tickets
                    <span className="text-xs absolute">™</span>
                </h1>
                <img className="hidden sm:inline-block ml-4 -mt-10 animate-in spin-in-90 ease-in-out duration-1000" width={75} src="/logo128.png" alt="ticket" />
                <img className="absolute inline-block top-[80px] sm:hidden ml-4 animate-in spin-in-90 ease-in-out duration-1000" width={50} src="/logo128.png" alt="ticket" />
            </>
            <h2 className="text-lg text-gray-800 font-bold">Elevate Your Electronic Tickets</h2>
            <p className="mt-4 mb-6 sm:my-6">Transform your electronic ticket receipt into a beautiful replica made for gifting and sharing.</p>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md text-center sm:flex-grow md:w-[200px] md:h-[110px] w-full">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 text-left">1. Add Details</h3>
                    <p className="text-xs sm:text-sm text-gray-600 text-left">Add event details manually or with Generative AI.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center mt-1 md:mt-0 md:flex-grow md:w-[200px] md:h-[110px] w-full">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 text-left">2. Preview</h3>
                    <p className="text-xs sm:text-sm text-gray-600 text-left">Get a real-time look at your replica ticket design.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center mt-1 md:mt-0 md:flex-grow md:w-[200px] md:h-[110px] w-full">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 text-left">3. Share!</h3>
                    <p className="text-xs sm:text-sm text-gray-600 text-left">Create a unique ticket link for your lucky recipient.</p>
                </div>
            </div>
        </div>
    )
}
