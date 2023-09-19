export const IntroHero = () => {
    return (
        <div className="text-center sm:text-left max-w-[900px] px-6 pt-12 sm:pt-16 lg:pt-4">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-center text-gray-800 mb-2 inline-block">
                Pretty Tickets
                <span className="text-xs absolute">™</span>
            </h1>
            <img className="hidden sm:inline-block ml-4 -mt-10 animate-in spin-in-90 ease-in-out duration-1000" width={75} src="/logo128.png" alt="ticket" />
            <img className="absolute inline-block top-[80px] sm:hidden ml-4 animate-in spin-in-90 ease-in-out duration-1000 -mt-4" width={50} src="/logo128.png" alt="ticket" />
            <h2 className="text-md mt-2 font-semibold italic">Use AI to transform purchases into beautiful commemorative tickets.</h2>
        </div>
    )
}
